import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
      console.log('notify');
      toast('Please enter a word for search');
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
    return (
      <ContainerStyle>
        <div>
          <Toaster
            toastOptions={{
              style: {
                padding: '20px',
                color: '#3f51b5',
              },
            }}
          />
        </div>
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        <Loader loading={this.state.isLoading} />
        {this.state.images.length > 0 && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </ContainerStyle>
    );
  }
}
