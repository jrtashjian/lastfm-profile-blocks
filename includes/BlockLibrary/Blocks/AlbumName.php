<?php
/**
 * The AlbumName block class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\BlockLibrary\Blocks;

/**
 * The AlbumName block class.
 */
class AlbumName extends BaseBlock {
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
