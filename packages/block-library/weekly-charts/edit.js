/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	BlockContextProvider,
	useInnerBlocksProps,
	// store as blockEditorStore,
} from '@wordpress/block-editor';
// import { useDispatch, useSelect } from '@wordpress/data';
// import {
// 	Button,
// 	Placeholder,
// 	TextControl,
// } from '@wordpress/components';
import {
	useEntityProp,
	// store as coreDataStore,
} from '@wordpress/core-data';
import { useEffect, useMemo, useState } from '@wordpress/element';

const TEMPLATE = [
	[ 'lastfm-profile-blocks/dynamic-template', {}, [
		[ 'lastfm-profile-blocks/item-image', { itemImageProp: 'album.images', itemLinkProp: 'album.url' } ],
		[ 'lastfm-profile-blocks/item-name', { itemTextProp: 'album.name', itemLinkProp: 'album.url' } ],
		[ 'lastfm-profile-blocks/item-name', { itemTextProp: 'artist.name', itemLinkProp: 'artist.url' } ],
	] ],
];

const Edit = ( {
	// attributes,
	// setAttributes,
	// clientId,
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'lastfm_profile_blocks_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'lastfm_profile_blocks_profile' );

	// const { saveEditedEntityRecord } = useDispatch( coreDataStore );

	const [ items, setItems ] = useState();

	useEffect( () => {
		if ( ! apiKey || ! defaultProfile ) {
			setItems( [] );
			return;
		}

		const fetchItems = async () => {
			console.debug( 'fetching items from Last.fm' );
			try {
				const response = await fetch( `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${ encodeURIComponent( defaultProfile ) }&api_key=${ encodeURIComponent( apiKey ) }&format=json&limit=6&period=7day` );
				const data = await response.json();
				setItems( data.topalbums.album || [] );
			} catch ( error ) {
				setItems( [] );
			}
		};

		fetchItems();
	}, [ apiKey, defaultProfile ] );

	// const onSubmit = async ( event ) => {
	// 	event.preventDefault();
	// 	await saveEditedEntityRecord( 'root', 'site' );
	// };
	// const onChange = ( value ) => setApiKey( value );

	const collection = useMemo(
		() => items?.map( ( item ) => ( {
			item: {
				artist: {
					name: item.artist.name,
					url: item.artist.url,
				},
				album: {
					name: item.name,
					url: item.url,
					playcount: item.playcount,
					images: item.image.reduce( ( acc, img ) => {
						acc[ img.size ] = img[ '#text' ];
						return acc;
					}, {} ),
				},
			},
		} ) ),
		[ items ]
	);

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps, { template: TEMPLATE } );

	return (
		<BlockContextProvider value={ { collection } }>
			<div { ...innerBlockProps } />
		</BlockContextProvider>

	// 	{ /* <Placeholder
	// 		label={ __( 'Weekly Charts', 'lastfm-profile-blocks' ) }
	// 		icon={ <BlockIcon showColors /> }
	// 		instructions={ __( 'This block displays the weekly charts from Last.fm.', 'lastfm-profile-blocks' ) }
	// 	>
	// 		<form onSubmit={ onSubmit }>
	// 			<TextControl
	// 				__next40pxDefaultSize
	// 				value={ apiKey || '' }
	// 				className="wp-block-embed__placeholder-input"
	// 				label={ __( 'Last.fm API Key', 'lastfm-profile-blocks' ) }
	// 				hideLabelFromVision
	// 				placeholder={ __( 'Enter your Last.fm API key', 'lastfm-profile-blocks' ) }
	// 				onChange={ onChange }
	// 			/>
	// 			<Button __next40pxDefaultSize variant="primary" type="submit">
	// 				{ __( 'Save API Key', 'lastfm-profile-blocks' ) }
	// 			</Button>
	// 		</form>

	// 		<pre>{ JSON.stringify( { apiKey, defaultProfile }, null, 2 ) }</pre>
	// 	</Placeholder> */ }
	);
};
export default Edit;
