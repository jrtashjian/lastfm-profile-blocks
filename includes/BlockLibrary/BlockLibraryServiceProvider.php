<?php
/**
 * The BlockLibraryServiceProvider class.
 *
 * @package LastFMProfileBlocks
 */

namespace LastFMProfileBlocks\BlockLibrary;

use LastFMProfileBlocks\BlockLibrary\Blocks\Friends;
use LastFMProfileBlocks\BlockLibrary\Blocks\RecentTracks;
use LastFMProfileBlocks\BlockLibrary\Blocks\TopCharts;
use LastFMProfileBlocks\BlockLibrary\Blocks\WeeklyCharts;
use LastFMProfileBlocks\BlockLibrary\Blocks\DynamicTemplate;
use LastFMProfileBlocks\Dependencies\League\Container\ServiceProvider\AbstractServiceProvider;
use LastFMProfileBlocks\Dependencies\League\Container\ServiceProvider\BootableServiceProviderInterface;

/**
 * The BlockLibraryServiceProvider class.
 */
class BlockLibraryServiceProvider extends AbstractServiceProvider implements BootableServiceProviderInterface {
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
	public function register(): void {}

	/**
	 * Bootstrap any application services by hooking into WordPress with actions/filters.
	 *
	 * @return void
	 */
	public function boot(): void {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Register the blocks.
	 */
	public function register_blocks() {
		$blocks = array(
			Friends::class,
			RecentTracks::class,
			TopCharts::class,
			WeeklyCharts::class,
			DynamicTemplate::class,
		);

		foreach ( $blocks as $block ) {
			/** @var Blocks\BaseBlock */ // phpcs:ignore
			$block_object = new $block();

			register_block_type(
				$block_object->block_type_metadata(),
				array(
					'render_callback' => array( $block_object, 'render_block' ),
				)
			);
		}
	}
}
