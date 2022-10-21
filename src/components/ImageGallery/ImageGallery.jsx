import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryStyle } from "./ImageGallery.styled";

export const ImageGallery = ({images}) => {
  return (
    <ImageGalleryStyle>
      {images.map(({id, webformatURL, largeImageURL, tags}) => <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags}/>)}
    </ImageGalleryStyle>
  );
};
