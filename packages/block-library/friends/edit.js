/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

const Edit = () => {
	const [ apiKey ] = useEntityProp( 'root', 'site', 'lastfm_profile_blocks_api_key' );
	const [ defaultProfile ] = useEntityProp( 'root', 'site', 'lastfm_profile_blocks_profile' );

	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<pre>{ JSON.stringify( { apiKey, defaultProfile }, null, ' ' ) }</pre>
			{ __( 'Hello, World! (from the editor)', 'lastfm-profile-blocks' ) }
		</div>
	);
};
export default Edit;
