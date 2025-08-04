/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'album-name',
		title: __( 'Album Name', 'lastfm-profile-blocks' ),
		description: __( 'Display the name of the album.', 'lastfm-profile-blocks' ),
		attributes: { itemTextProp: 'album.name', itemLinkProp: 'album.url' },
		isDefault: true,
	},
	{
		name: 'artist-name',
		title: __( 'Artist Name', 'lastfm-profile-blocks' ),
		description: __( 'Display the name of the artist.', 'lastfm-profile-blocks' ),
		attributes: { itemTextProp: 'artist.name', itemLinkProp: 'artist.url' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemTextProp ===
		variationAttributes.itemTextProp;

	if ( ! variation.scope ) {
		variation.scope = [ 'inserter', 'block', 'transform' ];
	}
} );

export default variations;
