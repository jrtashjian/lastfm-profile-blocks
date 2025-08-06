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

		$output = esc_html( $item_text );

		if ( $this->get_block_attribute( 'isLink' ) && $item_link ) {
			$output = sprintf(
				'<a href="%s" target="%s">%s</a>',
				esc_url( $item_link ),
				esc_attr( $this->get_block_attribute( 'linkTarget' ) ),
				$output
			);
		}

		return sprintf(
			'<div %s>%s</div>',
			get_block_wrapper_attributes(
				array(
					'class' => str_replace( '.', '-', $this->get_block_attribute( 'itemTextProp' ) ),
				)
			),
			$output
		);
	}
}
