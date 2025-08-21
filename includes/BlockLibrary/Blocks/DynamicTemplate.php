<?php
/**
 * The DynamicTemplate block class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\BlockLibrary\Blocks;

use WP_Block;

/**
 * The DynamicTemplate block class.
 */
class DynamicTemplate extends BaseBlock {
	/**
	 * Renders the block on the server.
	 *
	 * @return string Returns the block content.
	 */
	public function render() {
		// Retrieve the 'collection' from block context, defaulting to an empty array if not set.
		$collection = $this->get_block_context( 'collection' );

		if ( is_array( $collection ) && empty( $collection ) ) {
			return sprintf(
				'<div %s><p>There are currently no items to display.</p></div>',
				get_block_wrapper_attributes()
			);
		}

		$rendered_blocks = array();

		// If a collection exists, render a block for each item in the collection.
		foreach ( (array) $collection as $item ) {
			$block_instance = new WP_Block(
				$this->instance->parsed_block,
				array( 'item' => $item )
			);

			$rendered_blocks[] = $block_instance->render();
		}

		// If blocks were rendered from the collection, return their combined output.
		if ( ! empty( $rendered_blocks ) ) {
			return implode( '', $rendered_blocks );
		}

		// Render a singular instance of this block if no collection is present.
		return sprintf(
			'<div %s>%s</div>',
			get_block_wrapper_attributes(),
			$this->content
		);
	}
}
