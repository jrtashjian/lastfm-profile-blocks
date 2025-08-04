/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from './block.json';
import { default as edit } from './edit';
import { default as variations } from './variations';

const { name } = json;

registerBlockType( name, {
	edit,
	variations,
} );
