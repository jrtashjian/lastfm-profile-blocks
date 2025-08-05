<?php
/**
 * The PluginServiceProvider class.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\Plugin;

use ProfileBlocksLastFM\Dependencies\League\Container\ServiceProvider\AbstractServiceProvider;
use ProfileBlocksLastFM\Dependencies\League\Container\ServiceProvider\BootableServiceProviderInterface;

/**
 * The PluginServiceProvider class.
 */
class PluginServiceProvider extends AbstractServiceProvider implements BootableServiceProviderInterface {
	/**
	 * Get the services provided by the provider.
	 *
	 * @param string $id The service to check.
	 *
	 * @return array
	 */
	public function provides( string $id ): bool {
		$services = array();

		return in_array( $id, $services, true );
	}

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register(): void {
	}

	/**
	 * Bootstrap any application services by hooking into WordPress with actions/filters.
	 *
	 * @return void
	 */
	public function boot(): void {
		add_action( 'init', array( $this, 'register_settings' ) );
	}

	/**
	 * Register the plugin settings.
	 */
	public function register_settings() {
		// If the current user can't edit_theme_options, bail.
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		register_setting(
			'profile_blocks_lastfm',
			'profile_blocks_lastfm_api_key',
			array(
				'type'              => 'string',
				'description'       => __( 'The api key for authenticating with Last.FM.', 'profile-blocks-lastfm' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);

		register_setting(
			'profile_blocks_lastfm',
			'profile_blocks_lastfm_profile',
			array(
				'type'              => 'string',
				'description'       => __( 'The default Last.FM profile to use.', 'profile-blocks-lastfm' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}
}
