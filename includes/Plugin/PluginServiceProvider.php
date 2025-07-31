<?php
/**
 * The PluginServiceProvider class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\Plugin;

use LastFMProfileBlocks\Dependencies\League\Container\ServiceProvider\AbstractServiceProvider;
use LastFMProfileBlocks\Dependencies\League\Container\ServiceProvider\BootableServiceProviderInterface;

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
	}
}
