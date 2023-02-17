import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { TheImgByAPI } from '../services/api';

export function App() {
  const [imgs, setImgs] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = query => {
    setQuery(query);
    setImgs([]);
    setIsLoading(true);
    setError(null);
    setPage(1);
    setShowLoadMore(false);
  };

  useEffect(() => {
    if (!query) return;

    const theImgByAPI = new TheImgByAPI();
    const getPhotos = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await theImgByAPI.fetchImgByQuery(
          query,
          page
        );

        setImgs(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [page, query]);

  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onFormSubmit={formSubmit} />
      {imgs?.length > 0 && <ImageGallery imgs={imgs} />}

      {isLoading && <Loader />}
      {showLoadMore && <Button onClick={onBtnClick} />}
      {error && <p>Error{error}</p>}
    </>
  );
}
