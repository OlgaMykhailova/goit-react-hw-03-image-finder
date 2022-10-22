import { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Modal } from '../Modal/Modal';

import {
  ImageGalleryItemStyle,
  GalleryItemImageStyle,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL, id } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <ImageGalleryItemStyle onClick={this.toggleModal}>
          <GalleryItemImageStyle src={webformatURL} alt={tags} key={id} />
        </ImageGalleryItemStyle>
        {isModalOpen && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number, 
    webformatURL: PropTypes.string.isRequired, 
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
