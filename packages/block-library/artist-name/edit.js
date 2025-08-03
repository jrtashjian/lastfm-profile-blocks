/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( {
	attributes,
	context: { artist },
} ) => {
	const blockProps = useBlockProps();
	return <div { ...blockProps }>{ artist?.name || __( 'Artist name not available', 'lastfm-profile-blocks' ) }</div>;
};
export default Edit;
