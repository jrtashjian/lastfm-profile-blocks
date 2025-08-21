/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'top-artists',
		title: __( 'Top Artists', 'profile-blocks-lastfm' ),
		description: __( 'Display the top artists of a user.', 'profile-blocks-lastfm' ),
		attributes: { collection: 'artists' },
		innerBlocks: [
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
	},
	{
		name: 'top-albums',
		title: __( 'Top Albums', 'profile-blocks-lastfm' ),
		description: __( 'Display the top albums of a user.', 'profile-blocks-lastfm' ),
		attributes: { collection: 'albums' },
		innerBlocks: [
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
		isDefault: true,
	},
	{
		name: 'top-tracks',
		title: __( 'Top Tracks', 'profile-blocks-lastfm' ),
		description: __( 'Display the top tracks of a user.', 'profile-blocks-lastfm' ),
		attributes: { collection: 'tracks' },
		innerBlocks: [
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
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.collection ===
        variationAttributes.collection;
} );

export default variations;
