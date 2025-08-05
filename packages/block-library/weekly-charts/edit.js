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
	[ 'profile-blocks-lastfm/dynamic-template', {}, [
		[ 'profile-blocks-lastfm/item-image', { itemImageProp: 'album.images', itemLinkProp: 'album.url' } ],
		[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'album.name', itemLinkProp: 'album.url' } ],
		[ 'profile-blocks-lastfm/item-name', { itemTextProp: 'artist.name', itemLinkProp: 'artist.url' } ],
	] ],
];

const Edit = ( {
	// attributes,
	// setAttributes,
	// clientId,
} ) => {
	const [ apiKey, setApiKey ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_api_key' );
	const [ defaultProfile, setDefaultProfile ] = useEntityProp( 'root', 'site', 'profile_blocks_lastfm_profile' );

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
	// 		label={ __( 'Weekly Charts', 'profile-blocks-lastfm' ) }
	// 		icon={ <BlockIcon showColors /> }
	// 		instructions={ __( 'This block displays the weekly charts from Last.fm.', 'profile-blocks-lastfm' ) }
	// 	>
	// 		<form onSubmit={ onSubmit }>
	// 			<TextControl
	// 				__next40pxDefaultSize
	// 				value={ apiKey || '' }
	// 				className="wp-block-embed__placeholder-input"
	// 				label={ __( 'Last.fm API Key', 'profile-blocks-lastfm' ) }
	// 				hideLabelFromVision
	// 				placeholder={ __( 'Enter your Last.fm API key', 'profile-blocks-lastfm' ) }
	// 				onChange={ onChange }
	// 			/>
	// 			<Button __next40pxDefaultSize variant="primary" type="submit">
	// 				{ __( 'Save API Key', 'profile-blocks-lastfm' ) }
	// 			</Button>
	// 		</form>

	// 		<pre>{ JSON.stringify( { apiKey, defaultProfile }, null, 2 ) }</pre>
	// 	</Placeholder> */ }
	);
};
export default Edit;
