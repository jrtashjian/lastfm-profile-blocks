<?php
/**
 * The WeeklyCharts block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

use WP_Block;

/**
 * The WeeklyCharts block class.
 */
class WeeklyCharts extends BaseBlock {
	/**
	 * Renders the block on the server.
	 *
	 * @return string Returns the block content.
	 */
	public function render() {
		$api_key = get_option( 'profile_blocks_lastfm_api_key' );
		$profile = get_option( 'profile_blocks_lastfm_profile' );

		$request_url = sprintf(
			'https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=%s&api_key=%s&format=json&limit=6&period=7day',
			rawurlencode( $profile ),
			rawurlencode( $api_key )
		);

		$response = wp_remote_get( $request_url );
		if ( is_wp_error( $response ) ) {
			$this->content = '<p>Unable to fetch data from Last.fm.</p>';
			return;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		$items = isset( $data['topalbums']['album'] ) ? $data['topalbums']['album'] : array();

		$collection = array_map(
			function ( $item ) {
				return array(
					'artist' => array(
						'name' => $item['artist']['name'],
						'url'  => $item['artist']['url'],
					),
					'album'  => array(
						'name'      => $item['name'],
						'url'       => $item['url'],
						'playcount' => $item['playcount'],
						'images'    => array_reduce(
							$item['image'],
							function ( $acc, $img ) {
								$acc[ $img['size'] ] = $img['#text'];
								return $acc;
							},
							array()
						),
					),
				);
			},
			$items ?? array()
		);

		$this->content = '';

		foreach ( $this->instance->parsed_block['innerBlocks'] as $block ) {
			$block_instance = new WP_Block(
				$block,
				array( 'collection' => $collection )
			);

			$this->content .= $block_instance->render();
		}

		return sprintf(
			'<div %s>%s</div>',
			get_block_wrapper_attributes(),
			$this->content
		);
	}
}
