<?php
/**
 * The ItemImage block class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\BlockLibrary\Blocks;

/**
 * The ItemImage block class.
 */
class ItemImage extends BaseBlock {
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
