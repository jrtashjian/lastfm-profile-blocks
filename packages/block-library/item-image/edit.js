/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( {
	attributes: { itemImageProp, itemLinkProp },
	context: { item },
} ) => {
	const getByPath = ( object, path = '' ) => {
		return path
			.split( '.' )
			.reduce( ( current, key ) => ( current ? current[ key ] : undefined ), object );
	};

	const itemImage = getByPath( item, itemImageProp ) || '';
	const itemLink = getByPath( item, itemLinkProp ) || '';

	const blockProps = useBlockProps();
	return (
		<figure { ...blockProps }>
			<img src={ itemImage.large } alt="" />
		</figure>
	);
};
export default Edit;
