/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'album-name',
		title: __( 'Album Name', 'profile-blocks-lastfm' ),
		description: __( 'Display the name of the album.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'album.name', itemLinkProp: 'album.url' },
		isDefault: true,
	},
	{
		name: 'artist-name',
		title: __( 'Artist Name', 'profile-blocks-lastfm' ),
		description: __( 'Display the name of the artist.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'artist.name', itemLinkProp: 'artist.url' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemTextProp ===
		variationAttributes.itemTextProp;
} );

export default variations;
