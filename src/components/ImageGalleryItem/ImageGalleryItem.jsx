import {ImageGalleryItemStyle, GalleryItemImageStyle} from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({webformatURL, largeImageURL, tags}) => {
  return (
    <ImageGalleryItemStyle>
      <GalleryItemImageStyle src={webformatURL} alt={tags} />
    </ImageGalleryItemStyle>
  );
};
