<?php
/**
 * Plugin Name: Profile Blocks for LastFM
 * Plugin URI: https://jrtashjian.com
 * Description: ProfileBlocksLastFM Plugin Description.
 * Version: 0.0.1
 * Requires at least: 6.8
 * Requires PHP: 7.4
 * Author: JR Tashjian
 * Author URI: https://jrtashjian.com
 * Text Domain: profile-blocks-lastfm
 * Domain Path: /languages
 *
 * Copyright 2019-2025 JR Tashjian
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *
 * @package ProfileBlocksLastFM
 */

defined( 'ABSPATH' ) || exit;

// Guard the plugin from initializing more than once.
if ( class_exists( \ProfileBlocksLastFM\Application::class ) ) {
	return;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Create and retrieve the main application container instance.
 *
 * @return Application The application container.
 */
function profile_blocks_lastfm() {
	return \ProfileBlocksLastFM\Application::get_instance();
}

profile_blocks_lastfm()->set_base_path( __FILE__ );

/**
 * Service Providers.
 */
profile_blocks_lastfm()->addServiceProvider( new \ProfileBlocksLastFM\Plugin\PluginServiceProvider() );
profile_blocks_lastfm()->addServiceProvider( new \ProfileBlocksLastFM\BlockLibrary\BlockLibraryServiceProvider() );

register_activation_hook( __FILE__, array( profile_blocks_lastfm(), 'activation' ) );
register_deactivation_hook( __FILE__, array( profile_blocks_lastfm(), 'deactivation' ) );

add_action( 'plugins_loaded', array( profile_blocks_lastfm(), 'load_text_domain' ) );
