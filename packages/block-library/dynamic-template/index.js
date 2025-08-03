/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { layout } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import json from './block.json';
import { default as edit } from './edit';

const { name } = json;

registerBlockType( name, {
	icon: layout,
	edit,
	save: ( { ref } ) => ref ? null : <InnerBlocks.Content />,
} );
