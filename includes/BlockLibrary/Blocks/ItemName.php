<?php
/**
 * The ItemName block class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\BlockLibrary\Blocks;

/**
 * The ItemName block class.
 */
class ItemName extends BaseBlock {
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
