import thumbnailGalleryWidgetIcon from 'assets/images/thumbnail_gallery_widget.svg';

Scrivito.provideEditingConfig('ThumbnailGalleryWidget', {
  title: 'Thumbnail Gallery',
  description: 'A widget with an thumbnail image gallery.',
  thumbnail: `/${thumbnailGalleryWidgetIcon}`,
  attributesConfig: {
    images: {
      title: 'Images',
    },
    showTags: {
      title: 'Show list of tags?',
      description: 'Default: No',
      values: [
        { value: 'yes', title: 'Yes' },
        { value: 'no', title: 'No' },
      ],
    },
  },
  generalProperties: [
    'images',
    'showTags',
  ],
});
