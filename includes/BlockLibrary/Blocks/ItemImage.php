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
		$item = $this->get_block_context( 'item' );

		$item_image = $this->getByPath( $item, $this->get_block_attribute( 'itemImageProp' ) );
		$item_link  = $this->getByPath( $item, $this->get_block_attribute( 'itemLinkProp' ) );

		return sprintf(
			'<figure %s><img src="%s" alt="" /></figure>',
			get_block_wrapper_attributes(),
			$item_image['medium'] ?? ''
		);
	}
}
