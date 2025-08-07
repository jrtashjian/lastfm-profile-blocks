/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ResizableBox,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const imageSizeLabels = {
	small: __( 'Small', 'profile-blocks-lastfm' ),
	medium: __( 'Medium', 'profile-blocks-lastfm' ),
	large: __( 'Large', 'profile-blocks-lastfm' ),
	extralarge: __( 'Extra Large', 'profile-blocks-lastfm' ),
};

const fallbackImage = 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';

const Edit = ( {
	attributes: { itemImageProp, itemLinkProp, itemImageSize, width, isLink, linkTarget },
	setAttributes,
	isSelected,
	context: { item },
} ) => {
	const getByPath = ( object, path = '' ) => {
		return path
			.split( '.' )
			.reduce( ( current, key ) => ( current ? current[ key ] : undefined ), object );
	};

	const itemImage = getByPath( item, itemImageProp ) || {};
	const itemLink = getByPath( item, itemLinkProp ) || '';

	const minWidth = 20;
	const [ defaultSize, setDefaultSize ] = useState( minWidth );

	const img = (
		<img
			src={ itemImage[ itemImageSize ] ?? fallbackImage }
			alt=""
			onLoad={ ( event ) => {
				setDefaultSize( event.target.naturalWidth );
			} }
		/>
	);

	let imageDisplay = img;

	if ( isLink && itemLink ) {
		imageDisplay = (
			<a href={ itemLink }
				target="_blank"
				rel="noopener noreferrer"
				onClick={ ( event ) => event.preventDefault() }
			>
				{ img }
			</a>
		);
	}

	const currentWidth = width || defaultSize;

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'profile-blocks-lastfm' ) }>
					<SelectControl
						label={ __( 'Image Size', 'profile-blocks-lastfm' ) }
						value={ itemImageSize }
						options={ Object.keys( imageSizeLabels ).map( ( size ) => ( {
							label: imageSizeLabels[ size ] || size,
							value: size,
						} ) ) }
						onChange={ ( value ) => setAttributes( { itemImageSize: value } ) }
					/>
					<RangeControl
						__next40pxDefaultSize
						label={ __( 'Image Width', 'profile-blocks-lastfm' ) }
						onChange={ ( value ) => setAttributes( { width: value } ) }
						min={ minWidth }
						max={ 1000 }
						value={ currentWidth }
					/>
					<ToggleControl
						label={ __( 'Link to item', 'profile-blocks-lastfm' ) }
						checked={ isLink }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'profile-blocks-lastfm' ) }
						checked={ linkTarget === '_blank' }
						onChange={ ( value ) => setAttributes( { linkTarget: value ? '_blank' : '_self' } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<ResizableBox
				size={ { width, height: width } }
				showHandle={ isSelected }
				minWidth={ minWidth }
				minHeight={ minWidth }
				lockAspectRatio
				enable={ {
					top: false,
					right: true,
					bottom: false,
					left: true,
				} }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					setAttributes( {
						width: parseInt( currentWidth + delta.width, 10 ),
					} );
				} }
			>
				{ imageDisplay }
			</ResizableBox>
		</div>
	);
};
export default Edit;
