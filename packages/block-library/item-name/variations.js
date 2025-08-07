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
	{
		name: 'track-name',
		title: __( 'Track Name', 'profile-blocks-lastfm' ),
		description: __( 'Display the name of the track.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'track.name', itemLinkProp: 'track.url' },
	},
	{
		name: 'album-playcount',
		title: __( 'Album Playcount', 'profile-blocks-lastfm' ),
		description: __( 'Display the playcount of the album.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'album.playcount' },
	},
	{
		name: 'artist-playcount',
		title: __( 'Artist Playcount', 'profile-blocks-lastfm' ),
		description: __( 'Display the playcount of the artist.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'artist.playcount' },
	},
	{
		name: 'track-playcount',
		title: __( 'Track Playcount', 'profile-blocks-lastfm' ),
		description: __( 'Display the playcount of the track.', 'profile-blocks-lastfm' ),
		attributes: { itemTextProp: 'track.playcount' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.itemTextProp ===
		variationAttributes.itemTextProp;
} );

export default variations;
