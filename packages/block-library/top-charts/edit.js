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

const TEMPLATE = {
	artists: [
		[ 'core/heading', { level: 3, content: __( 'Top Artists', 'profile-blocks-lastfm' ) } ],
		[ 'profile-blocks-lastfm/dynamic-template', { layout: { type: 'flex' } }, [
			[ 'profile-blocks-lastfm/item-image', { itemImageProp: 'artist.images', itemLinkProp: 'artist.url' } ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap', orientation: 'vertical' }, style: { layout: { selfStretch: 'fill' }, spacing: { blockGap: '0' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'artist.name', itemLinkProp: 'artist.url', isLink: true, style: { typography: { fontStyle: 'normal', fontWeight: 700 } } } ],
			] ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap' }, style: { spacing: { blockGap: '0.25em' }, typography: { fontSize: '0.8em' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'artist.playcount' } ],
				[ 'core/paragraph', { content: __( 'plays', 'profile-blocks-lastfm' ) } ],
			] ],
		] ],
	],
	albums: [
		[ 'core/heading', { level: 3, content: __( 'Top Albums', 'profile-blocks-lastfm' ) } ],
		[ 'profile-blocks-lastfm/dynamic-template', { layout: { type: 'flex' } }, [
			[ 'profile-blocks-lastfm/item-image', { itemImageProp: 'album.images', itemLinkProp: 'album.url' } ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap', orientation: 'vertical' }, style: { layout: { selfStretch: 'fill' }, spacing: { blockGap: '0' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'album.name', itemLinkProp: 'album.url', isLink: true, style: { typography: { fontStyle: 'normal', fontWeight: 700 } } } ],
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'artist.name', itemLinkProp: 'artist.url', isLink: true, style: { typography: { fontSize: '0.8em' } } } ],
			] ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap' }, style: { spacing: { blockGap: '0.25em' }, typography: { fontSize: '0.8em' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'album.playcount' } ],
				[ 'core/paragraph', { content: __( 'plays', 'profile-blocks-lastfm' ) } ],
			] ],
		] ],
	],
	tracks: [
		[ 'core/heading', { level: 3, content: __( 'Top Tracks', 'profile-blocks-lastfm' ) } ],
		[ 'profile-blocks-lastfm/dynamic-template', { layout: { type: 'flex' } }, [
			[ 'profile-blocks-lastfm/item-image', { itemImageProp: 'track.images', itemLinkProp: 'track.url' } ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap', orientation: 'vertical' }, style: { layout: { selfStretch: 'fill' }, spacing: { blockGap: '0' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'track.name', itemLinkProp: 'track.url', isLink: true, style: { typography: { fontStyle: 'normal', fontWeight: 700 } } } ],
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'artist.name', itemLinkProp: 'artist.url', isLink: true, style: { typography: { fontSize: '0.8em' } } } ],
			] ],
			[ 'core/group', { layout: { type: 'flex', flexWrap: 'nowrap' }, style: { spacing: { blockGap: '0.25em' }, typography: { fontSize: '0.8em' } } }, [
				[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'track.playcount' } ],
				[ 'core/paragraph', { content: __( 'plays', 'profile-blocks-lastfm' ) } ],
			] ],
		] ],
	],
};

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
	const innerBlockProps = useInnerBlocksProps( blockProps, { template: TEMPLATE[ collection ] } );

	return (
		<BlockContextProvider value={ { collection: items } }>
			<div { ...innerBlockProps } />
		</BlockContextProvider>
	);
};
export default Edit;
