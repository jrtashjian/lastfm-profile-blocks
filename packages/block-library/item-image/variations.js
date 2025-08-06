/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'album-image',
		title: __( 'Album Image', 'profile-blocks-lastfm' ),
		description: __( 'Display the name of the album.', 'profile-blocks-lastfm' ),
		attributes: { itemImageProp: 'album.images', itemLinkProp: 'album.url' },
		isDefault: true,
	},
	{
		name: 'artist-image',
		title: __( 'Artist Image', 'profile-blocks-lastfm' ),
		description: __( 'Display the image of the artist.', 'profile-blocks-lastfm' ),
		attributes: { itemImageProp: 'artist.images', itemLinkProp: 'artist.url' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemImageProp ===
		variationAttributes.itemImageProp;
} );

export default variations;
