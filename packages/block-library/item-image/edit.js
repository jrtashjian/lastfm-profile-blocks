/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ResizableBox,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( {
	attributes: { itemImageProp, itemLinkProp, width, isLink, linkTarget },
	setAttributes,
	isSelected,
	context: { item },
} ) => {
	const getByPath = ( object, path = '' ) => {
		return path
			.split( '.' )
			.reduce( ( current, key ) => ( current ? current[ key ] : undefined ), object );
	};

	const itemImage = getByPath( item, itemImageProp ) || {};
	const itemLink = getByPath( item, itemLinkProp ) || '';

	const minWidth = 20;
	const [ defaultSize, setDefaultSize ] = useState( minWidth );

	const img = (
		<img
			src={ itemImage.medium }
			alt=""
			onLoad={ ( event ) => {
				setDefaultSize( event.target.naturalWidth );
			} }
		/>
	);

	let imgWrapper = img;

	if ( isLink && itemLink ) {
		imgWrapper = (
			<a href={ itemLink }
				target="_blank"
				rel="noopener noreferrer"
				onClick={ ( event ) => event.preventDefault() }
			>
				{ img }
			</a>
		);
	}

	const currentWidth = width || defaultSize;

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'lastfm-profile-blocks' ) }>
					<RangeControl
						__next40pxDefaultSize
						label={ __( 'Image Width', 'lastfm-profile-blocks' ) }
						onChange={ ( value ) => setAttributes( { width: value } ) }
						min={ minWidth }
						max={ 1000 }
						value={ currentWidth }
					/>
					<ToggleControl
						label={ __( 'Link to item', 'lastfm-profile-blocks' ) }
						checked={ isLink }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'lastfm-profile-blocks' ) }
						checked={ linkTarget === '_blank' }
						onChange={ ( value ) => setAttributes( { linkTarget: value ? '_blank' : '_self' } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<ResizableBox
				size={ { width, height: width } }
				showHandle={ isSelected }
				minWidth={ minWidth }
				minHeight={ minWidth }
				lockAspectRatio
				enable={ {
					top: false,
					right: true,
					bottom: false,
					left: true,
				} }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					setAttributes( {
						width: parseInt( currentWidth + delta.width, 10 ),
					} );
				} }
			>
				{ imgWrapper }
			</ResizableBox>
		</div>
	);
};
export default Edit;
