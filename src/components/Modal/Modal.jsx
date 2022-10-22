import { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

import { OverlayStyle, ModalContainerStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropKlick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { tags, largeImageURL } = this.props;
    return createPortal(
      <OverlayStyle onClick={this.handleBackdropKlick}>
        <ModalContainerStyle>
          <img src={largeImageURL} alt={tags}  width='1100px'/>
        </ModalContainerStyle>
      </OverlayStyle>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};