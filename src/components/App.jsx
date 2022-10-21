import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from './api';
import { ContainerStyle } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    images: [],
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.setState.page
    ) {
      const searchQuery = this.state.searchQuery;
      const page = this.state.page;
      this.loadImages(searchQuery, page);
    }
  }

  loadImages = async (searchQuery, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const newImages = await fetchImages(searchQuery, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onFormSubmit = searchQuery => {
    if (searchQuery.trim().length === 0) {
      alert('Please enter a word for search');
      return;
    }

    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    console.log('pressed');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <ContainerStyle>
        <Searchbar onSubmit={this.onFormSubmit} />
        <Loader loading={this.state.isLoading} />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.loadMore}>Load more</Button>
      </ContainerStyle>
    );
  }
}