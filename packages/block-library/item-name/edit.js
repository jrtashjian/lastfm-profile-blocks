/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( {
	attributes: { itemProperty },
	context: { item },
} ) => {
	const itemPropertyValue = item?.[ itemProperty ] || {};

	const blockProps = useBlockProps();
	return <div { ...blockProps }>{ itemPropertyValue?.name }</div>;
};
export default Edit;
