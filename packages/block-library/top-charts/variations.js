/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'top-albums',
		title: __( 'Top Albums', 'profile-blocks-lastfm' ),
		description: __( 'Display the top albums of a user.', 'profile-blocks-lastfm' ),
		attributes: { chart: 'albums' },
		isDefault: true,
	},
	{
		name: 'top-artists',
		title: __( 'Top Artists', 'profile-blocks-lastfm' ),
		description: __( 'Display the top artists of a user.', 'profile-blocks-lastfm' ),
		attributes: { chart: 'artists' },
	},
	{
		name: 'top-tracks',
		title: __( 'Top Tracks', 'profile-blocks-lastfm' ),
		description: __( 'Display the top tracks of a user.', 'profile-blocks-lastfm' ),
		attributes: { chart: 'tracks' },
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.chart ===
        variationAttributes.chart;
} );

export default variations;
