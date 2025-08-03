<?php
/**
 * The ArtistName block class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\BlockLibrary\Blocks;

/**
 * The ArtistName block class.
 */
class ArtistName extends BaseBlock {
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
