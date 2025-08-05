<?php
/**
 * The LovedTracks block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

/**
 * The LovedTracks block class.
 */
class LovedTracks extends BaseBlock {
	/**
	 * Renders the block on the server.
	 *
	 * @return string Returns the block content.
	 */
	public function render() {
		return sprintf(
			'<div %s>%s</div>',
			get_block_wrapper_attributes(),
			self::class
		);
	}
}
