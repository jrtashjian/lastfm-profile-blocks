<?php
/**
 * Tests the plugin bootstrap file.
 *
 * @package ProfileBlocksLastFM
 */

namespace ProfileBlocksLastFM\Tests;

use ProfileBlocksLastFM\Application;

/**
 * Tests the plugin bootstrap file.
 */
class Bootstrap_Test extends \WP_UnitTestCase {

	/**
	 * Test that the plugin has been successfully loaded into the test suite.
	 */
	public function test_profile_blocks_lastfm_loaded() {
		$this->assertTrue( class_exists( Application::class ) );
	}

	/**
	 * Test that the profile_blocks_lastfm() helper function returns an instance of the Container.
	 */
	public function test_profile_blocks_lastfm_helper_returns_container_instance() {
		$container_instance = profile_blocks_lastfm();
		$this->assertTrue( $container_instance instanceof Application );
	}
}
