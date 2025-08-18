<?php
/**
 * The TopCharts block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

use ProfileBlocksLastFM\Plugin\LastFM;
use WP_Block;

/**
 * The TopCharts block class.
 */
class TopCharts extends BaseBlock {
	/**
	 * Renders the block on the server.
	 *
	 * @return string Returns the block content.
	 */
	public function render() {
		$method = match ( $this->get_block_attribute( 'collection' ) ) {
			'albums'  => 'get_top_albums',
			'artists' => 'get_top_artists',
			'tracks'  => 'get_top_tracks',
		};

		$collection = LastFM::$method(
			array(
				'user'   => $this->get_block_attribute( 'user' ),
				'period' => $this->get_block_attribute( 'period' ) ?? '7day',
				'limit'  => $this->get_block_attribute( 'itemsToShow' ) ?? 6,
			)
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
