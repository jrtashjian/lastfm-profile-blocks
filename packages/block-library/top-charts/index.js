/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import json from './block.json';
import { default as edit } from './edit';
import { default as variations } from './variations';

import './index.scss';

const { name } = json;

registerBlockType( name, {
	edit,
	save: ( { ref } ) => ref ? null : <InnerBlocks.Content />,
	variations,
} );
