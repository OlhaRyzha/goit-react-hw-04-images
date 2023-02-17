import { GalleryItem, ImageGallery } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ img }) {
  const { webformatURL, largeImageURL } = img;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onImgClick = () => {
    setModalIsOpen(prevState => !prevState);
  };

  return (
    <GalleryItem>
      <ImageGallery onClick={onImgClick} src={webformatURL} />
      {modalIsOpen && (
        <Modal onClick={onImgClick}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </GalleryItem>
  );
}
