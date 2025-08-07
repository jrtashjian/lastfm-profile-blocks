/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	BlockContextProvider,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const TEMPLATE = [
	[ 'profile-blocks-lastfm/dynamic-template', {}, [
		[ 'profile-blocks-lastfm/item-image', { itemImageProp: 'album.images', itemLinkProp: 'album.url' } ],
	] ],
];

const Edit = ( {
	attributes: { chart },
	// setAttributes,
	// clientId,
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_profile' );

	const [ collection, setCollection ] = useState( [] );

	useEffect( () => {
		if ( ! apiKey || ! defaultProfile ) {
			return;
		}

		const fetchItems = async () => {
			try {
				const data = await apiFetch( {
					path: addQueryArgs(
						'/profile-blocks-lastfm/v1/top-charts',
						{
							chart,
							user: defaultProfile,
							limit: 6,
							period: '7day',
						}
					),
				} );

				setCollection( data || [] );
			} catch ( error ) {}
		};

		fetchItems();
	}, [ apiKey, defaultProfile ] );

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps, { template: TEMPLATE } );

	return (
		<BlockContextProvider value={ { collection } }>
			<div { ...innerBlockProps } />
		</BlockContextProvider>
	);
};
export default Edit;
