import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from '../services/api';
import { ContainerStyle } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    images: [],
    isLoading: false,
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.state.searchQuery;
    const page = this.state.page;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.loadImages(searchQuery, page);
    }
  }

  loadImages = async (searchQuery, page) => {
    try {
      this.setState({
        isLoading: true,
      });

      const responseData = await fetchImages(searchQuery, page);

      const newImages = responseData.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          const image = { id, webformatURL, largeImageURL, tags };
          return image;
        }
      );
      console.log(newImages);

      if (newImages.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      const numberOfPages = Math.ceil(responseData.total / 12);

      this.setState({showButton: numberOfPages > page ? true : false})

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      Notify.failure('Something went wrong. Please try again.');
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onFormSubmit = searchQuery => {
    if (searchQuery.trim().length === 0) {
      Notify.warning('Please enter a word for search');
      return;
    }

    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, images, showButton } = this.state;

    return (
      <ContainerStyle>
        <Searchbar onSubmit={this.onFormSubmit} />
        {images.length > 0 && <ImageGallery images={this.state.images} />}
        <Loader loading={isLoading} />
        {showButton && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </ContainerStyle>
    );
  }
}
