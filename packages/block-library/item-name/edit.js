/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ( {
	attributes: { itemTextProp, itemLinkProp, isLink, linkTarget },
	setAttributes,
	context: { item },
} ) => {
	const getByPath = ( object, path = '' ) => {
		return path
			.split( '.' )
			.reduce( ( current, key ) => ( current ? current[ key ] : undefined ), object );
	};

	const itemText = getByPath( item, itemTextProp ) || '';
	const itemLink = getByPath( item, itemLinkProp ) || '';

	let itemDisplay = itemText;

	if ( isLink && itemLink ) {
		itemDisplay = (
			<a href={ itemLink }
				target="_blank"
				rel="noopener noreferrer"
				onClick={ ( event ) => event.preventDefault() }
			>
				{ itemText }
			</a>
		);
	}

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			{ itemLinkProp && (
				<InspectorControls>
					<PanelBody title={ __( 'Settings', 'profile-blocks-lastfm' ) }>
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
			) }
			{ itemDisplay }
		</div>
	);
};
export default Edit;
