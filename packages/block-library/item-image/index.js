/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from './block.json';
import { default as edit } from './edit';
import { default as variations } from './variations';

import './style.scss';
import './index.scss';

const { name } = json;

registerBlockType( name, {
	edit,
	variations,
} );
