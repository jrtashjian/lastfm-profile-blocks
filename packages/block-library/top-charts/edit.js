/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockContextProvider,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import {
	Button,
	ExternalLink,
	Placeholder,
	__experimentalHStack as HStack,
	__experimentalInputControl as InputControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { edit } from '@wordpress/icons';

const Edit = ( {
	attributes: { collection },
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_profile' );

	const [ showSetup, setShowSetup ] = useState( !! apiKey );

	const [ items, setItems ] = useState( [] );

	useEffect( () => {
		if ( ! apiKey ) {
			return;
		}

		const fetchItems = async () => {
			try {
				const data = await apiFetch( {
					path: addQueryArgs(
						'/profile-blocks-lastfm/v1/top-charts',
						{
							collection,
							limit: 6,
							period: '7day',
						}
					),
				} );

				setItems( data || [] );
			} catch ( error ) {}
		};

		fetchItems();
	}, [ apiKey, collection ] );

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps );

	if ( showSetup ) {
		const onSubmit = ( event ) => {
			event.preventDefault();
			setShowSetup( false );
		};

		return (
			<div { ...blockProps }>
				<Placeholder
					label={ __( 'Profile Blocks for Last.FM', 'profile-blocks-lastfm' ) }
					icon={ null }
					instructions={ __( 'Enter your Last.FM API key and default username. You can override the username for each block.', 'profile-blocks-lastfm' ) }
				>
					<form onSubmit={ onSubmit }>
						<HStack align="end">
							<InputControl
								__next40pxDefaultSize
								value={ apiKey || '' }
								className="wp-block-profile-blocks-lastfm-top-charts__placeholder-input"
								label={ __( 'API Key', 'profile-blocks-lastfm' ) }
								placeholder={ __( 'Enter your Last.fm API key', 'profile-blocks-lastfm' ) }
								onChange={ ( value ) => setApiKey( value ) }
								type="password"
								required
							/>
							<InputControl
								__next40pxDefaultSize
								value={ defaultProfile || '' }
								label={ __( 'Username', 'profile-blocks-lastfm' ) }
								placeholder={ __( 'Enter your Last.fm username', 'profile-blocks-lastfm' ) }
								onChange={ ( value ) => setDefaultProfile( value ) }
								required
							/>
							<Button __next40pxDefaultSize variant="primary" type="submit">
								{ __( 'Apply', 'profile-blocks-lastfm' ) }
							</Button>
						</HStack>
					</form>

					<ExternalLink href="https://www.last.fm/api/authentication" rel="noreferrer noopener">
						{ __( 'Get your Last.fm API key', 'profile-blocks-lastfm' ) }
					</ExternalLink>
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Settings', 'profile-blocks-lastfm' ) }
						icon={ edit }
						onClick={ () => setShowSetup( true ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<BlockContextProvider value={ { collection: items } }>
				<div { ...innerBlockProps } />
			</BlockContextProvider>
		</>
	);
};
export default Edit;
