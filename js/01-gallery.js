import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// Створення розмітки
 
const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('beforeend', createGalleryItem(galleryItems));


function createGalleryItem(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
      </li>`,
    )
    .join('');
}

// модалка

gallery.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  const modalWindowImg = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);
  modalWindowImg.show(gallery.addEventListener('click', closeOriginalImgByClick));
  function closeOriginalImgByClick() {
    modalWindowImg.close(gallery.removeEventListener('keydown', closeOriginalImgByBtn));
  }

  // Закриття модального вікна 
  gallery.addEventListener('keydown', closeOriginalImgByBtn);
  function closeOriginalImgByBtn(event) {
    if (event.code === 'Escape') {
      modalWindowImg.close(gallery.removeEventListener('keydown', closeOriginalImgByBtn));
    }
  }
}