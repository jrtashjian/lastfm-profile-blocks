/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreviewProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { memo, useState } from '@wordpress/element';

function PreviewRenderer( {
	blocks,
	blockContextId,
	activeBlockContextId,
	setActiveBlockContextId,
	blockProps = {},
} ) {
	const blockPreviewProps = useBlockPreviewProps( { blocks } );

	blockPreviewProps.className = blockProps.className + ' ' + blockPreviewProps.className;
	blockPreviewProps.style = blockProps?.style || {};

	// Hide the preview for the active block context
	if ( blockContextId === activeBlockContextId ) {
		blockPreviewProps.style = { ...blockPreviewProps.style, display: 'none' };
	}

	const handleOnClick = () => {
		setActiveBlockContextId( blockContextId );
	};

	return (
		<div
			{ ...blockPreviewProps }
			tabIndex={ 0 }
			role="button"
			onClick={ handleOnClick }
			onKeyDown={ handleOnClick }
		/>
	);
}

const MemoizedPreviewRenderer = memo( PreviewRenderer );

const Edit = ( {
	clientId,
	context: { collection },
} ) => {
	const blocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	const [ activeBlockContextId, setActiveBlockContextId ] = useState( 0 );

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps, { __experimentalCaptureToolbars: true } );

	return collection && collection.map( ( item, key ) => (
		<BlockContextProvider key={ key } value={ { item } }>
			{ key === activeBlockContextId ? (
				<div { ...innerBlockProps } />
			) : null }
			<MemoizedPreviewRenderer
				blocks={ blocks }
				blockContextId={ key }
				activeBlockContextId={ activeBlockContextId }
				setActiveBlockContextId={ setActiveBlockContextId }
				blockProps={ innerBlockProps }
			/>
		</BlockContextProvider>
	) );
};
export default Edit;
