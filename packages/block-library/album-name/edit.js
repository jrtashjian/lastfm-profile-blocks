/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( {
	attributes,
	context: { album },
} ) => {
	const blockProps = useBlockProps();
	return <div { ...blockProps }>{ album?.name || __( 'Album name not available', 'lastfm-profile-blocks' ) }</div>;
};
export default Edit;
