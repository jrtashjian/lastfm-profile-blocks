<?php
/**
 * The ItemName block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

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
		$item = $this->get_block_context( 'item' );

		if ( ! $item ) {
			return '';
		}

		$item_text = $this->getByPath( $item, $this->get_block_attribute( 'itemTextProp' ) );
		$item_link = $this->getByPath( $item, $this->get_block_attribute( 'itemLinkProp' ) );

		return sprintf(
			'<div %s><a href="%s">%s</a></div>',
			get_block_wrapper_attributes(),
			$item_link,
			$item_text
		);
	}
}
