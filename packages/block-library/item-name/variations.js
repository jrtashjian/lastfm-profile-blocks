/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'album-name',
		title: __( 'Album Name', 'lastfm-profile-blocks' ),
		description: __( 'Display the name of the album.', 'lastfm-profile-blocks' ),
		attributes: { itemProperty: 'album' },
		isDefault: true,
	},
	{
		name: 'artist-name',
		title: __( 'Artist Name', 'lastfm-profile-blocks' ),
		description: __( 'Display the name of the artist.', 'lastfm-profile-blocks' ),
		attributes: { itemProperty: 'artist' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemProperty ===
		variationAttributes.itemProperty;

	if ( ! variation.scope ) {
		variation.scope = [ 'inserter', 'block', 'transform' ];
	}
} );

export default variations;
