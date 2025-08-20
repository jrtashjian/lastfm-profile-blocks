/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockContextProvider,
	useInnerBlocksProps,
	BlockControls,
	InspectorControls,
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
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	RangeControl,
} from '@wordpress/components';
import { edit } from '@wordpress/icons';

const PLACEHOLDER_RESPONSE = [
	{
		artist: {
			url: 'https://www.last.fm/music/Fake+Artist',
			name: 'Fake Artist',
			playcount: '987',
		},
		album: {
			name: 'Imaginary Album',
			url: 'https://www.last.fm/music/Fake+Artist/Imaginary+Album',
			playcount: '42',
		},
		track: {
			name: 'Sample Track',
			url: 'https://www.last.fm/music/Fake+Artist/_/Sample+Track',
			playcount: '17',
		},
	},
];

const Edit = ( {
	attributes: { collection, itemsToShow },
	setAttributes,
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_profile' );

	const [ showSetup, setShowSetup ] = useState( false );

	// Show setup form if API key is missing.
	useEffect( () => {
		setShowSetup( typeof apiKey === 'undefined' || ! apiKey );
	}, [ apiKey ] );

	const [ items, setItems ] = useState( [] );

	// Fetch items from Last.fm when API key is set.
	useEffect( () => {
		if ( ! apiKey || showSetup ) {
			return;
		}

		const fetchItems = async () => {
			try {
				let data = await apiFetch( {
					path: addQueryArgs(
						'/profile-blocks-lastfm/v1/top-charts',
						{
							collection,
							limit: itemsToShow,
							period: '7day',
						}
					),
				} );

				// Show placeholder data if no items are returned.
				if ( ! data || ( Array.isArray( data ) && ! data.length ) ) {
					data = PLACEHOLDER_RESPONSE;
				}

				setItems( data );
			} catch ( error ) {}
		};

		fetchItems();
	}, [ apiKey, collection, itemsToShow, showSetup ] );

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
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Settings', 'profile-blocks-lastfm' ) }
					resetAll={ () => {
						setAttributes( { itemsToShow: 6 } );
					} }
				>
					<ToolsPanelItem
						label={ __( 'Number of Items', 'profile-blocks-lastfm' ) }
						hasValue={ () => itemsToShow !== 6 }
						onDeselect={ () => setAttributes( { itemsToShow: 6 } ) }
						isShownByDefault
					>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __( 'Items to Show', 'profile-blocks-lastfm' ) }
							value={ itemsToShow }
							onChange={ ( value ) => setAttributes( { itemsToShow: value } ) }
							min={ 1 }
							max={ 20 }
							required
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<BlockContextProvider value={ { collection: items } }>
				<div { ...innerBlockProps } />
			</BlockContextProvider>
		</>
	);
};
export default Edit;
