/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( {
	attributes: { itemTextProp, itemLinkProp },
	context: { item },
} ) => {
	const getByPath = ( object, path ) => {
		return path
			.split( '.' )
			.reduce( ( current, key ) => ( current ? current[ key ] : undefined ), object );
	};

	const itemText = getByPath( item, itemTextProp ) || '';
	const itemLink = getByPath( item, itemLinkProp ) || '';

	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<a href={ itemLink }
				target="_blank"
				rel="noopener noreferrer"
				onClick={ ( event ) => event.preventDefault() }
				dangerouslySetInnerHTML={ { __html: itemText } }
			/>
		</div>
	);
};
export default Edit;
