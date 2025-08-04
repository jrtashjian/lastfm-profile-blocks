/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'album-image',
		title: __( 'Album Image', 'lastfm-profile-blocks' ),
		description: __( 'Display the name of the album.', 'lastfm-profile-blocks' ),
		attributes: { itemImageProp: 'album.images', itemLinkProp: 'album.url' },
		isDefault: true,
	},
	{
		name: 'artist-image',
		title: __( 'Artist Image', 'lastfm-profile-blocks' ),
		description: __( 'Display the image of the artist.', 'lastfm-profile-blocks' ),
		attributes: { itemImageProp: 'artist.images', itemLinkProp: 'artist.url' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemImageProp ===
		variationAttributes.itemImageProp;

	if ( ! variation.scope ) {
		variation.scope = [ 'inserter', 'block', 'transform' ];
	}
} );

export default variations;
