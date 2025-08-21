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
		add_action( 'rest_api_init', array( $this, 'register_rest_api' ) );
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

	/**
	 * Register the custom REST API endpoint.
	 */
	public function register_rest_api() {
		register_rest_route(
			'profile-blocks-lastfm/v1',
			'/top-charts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_top_charts_request' ),
				'permission_callback' => function () {
					return current_user_can( 'read' );
				},
				'args'                => array(
					'collection' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return in_array( $param, array( 'albums', 'artists', 'tracks' ), true );
						},
					),
					'api_key'    => array(
						'validate_callback' => function ( $param ) {
							return is_string( $param ) && ! empty( $param );
						},
					),
					'user'       => array(
						'validate_callback' => function ( $param ) {
							return is_string( $param );
						},
					),
					'period'     => array(
						'default'           => '7day',
						'validate_callback' => function ( $param ) {
							return in_array( $param, array( '7day', '1month', '3month', '6month', '12month', 'overall' ), true );
						},
					),
					'limit'      => array(
						'default'           => 6,
						'validate_callback' => function ( $param ) {
							return is_numeric( $param ) && $param > 0;
						},
					),
				),
			)
		);
	}

	/**
	 * Handle the top charts request.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response|WP_Error The REST response or error.
	 */
	public function handle_top_charts_request( $request ) {
		$collection = $request->get_param( 'collection' );
		$api_key    = $request->get_param( 'api_key' );
		$user       = $request->get_param( 'user' );
		$period     = $request->get_param( 'period' );
		$limit      = $request->get_param( 'limit' );

		$method = match ( $collection ) {
			'albums'   => 'get_top_albums',
			'artists'  => 'get_top_artists',
			'tracks'   => 'get_top_tracks',
		};

		$data = LastFM::$method(
			array(
				'api_key' => $api_key,
				'user'    => $user,
				'period'  => $period,
				'limit'   => intval( $limit ),
			)
		);

		return rest_ensure_response( $data );
	}
}
