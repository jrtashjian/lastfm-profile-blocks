/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockContextProvider,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const Edit = ( {
	attributes: { collection },
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_profile' );

	const [ items, setItems ] = useState( [] );

	useEffect( () => {
		if ( ! apiKey ) {
			return;
		}

		const fetchItems = async () => {
			try {
				const data = await apiFetch( {
					path: addQueryArgs(
						'/profile-blocks-lastfm/v1/top-charts',
						{
							collection,
							limit: 6,
							period: '7day',
						}
					),
				} );

				setItems( data || [] );
			} catch ( error ) {}
		};

		fetchItems();
	}, [ apiKey, collection ] );

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps );

	return (
		<BlockContextProvider value={ { collection: items } }>
			<div { ...innerBlockProps } />
		</BlockContextProvider>
	);
};
export default Edit;
