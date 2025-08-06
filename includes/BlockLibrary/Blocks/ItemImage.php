<?php
/**
 * The ItemImage block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

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

		if ( ! $item ) {
			return '';
		}

		$item_image = $this->getByPath( $item, $this->get_block_attribute( 'itemImageProp' ) );
		$item_link  = $this->getByPath( $item, $this->get_block_attribute( 'itemLinkProp' ) );

		$item_image_size = $this->get_block_attribute( 'itemImageSize' );

		$width = empty( $this->get_block_attribute( 'width' ) )
			? '' :
			intval( $this->get_block_attribute( 'width' ) );

		$image = sprintf(
			'<img src="%s" width="%s" alt="" />',
			esc_attr( $item_image[ $item_image_size ] ?? '' ),
			esc_attr( $width )
		);

		if ( $this->get_block_attribute( 'isLink' ) && $item_link ) {
			$image = sprintf(
				'<a href="%s" target="%s">%s</a>',
				esc_url( $item_link ),
				esc_attr( $this->get_block_attribute( 'linkTarget' ) ),
				$image
			);
		}

		return sprintf(
			'<div %s>%s</div>',
			get_block_wrapper_attributes(),
			$image
		);
	}
}
