export const getSavedPhotoIds = () => {
  const savedPhotoIds = localStorage.getItem('saved_photos')
    ? JSON.parse(localStorage.getItem('saved_photos'))
    : [];

  return savedPhotoIds;
};

export const savePhotoIds = (photoIdArr) => {
  if (photoIdArr.length) {
    localStorage.setItem('saved_photos', JSON.stringify(photoIdArr));
  } else {
    localStorage.removeItem('saved_photos');
  }
};

export const removePhotoId = (photoId) => {
  const savedPhotoIds = localStorage.getItem('saved_photos')
    ? JSON.parse(localStorage.getItem('saved_photos'))
    : null;

  if (!savedPhotoIds) {
    return false;
  }

  const updatedSavedPhotoIds = savedPhotoIds?.filter((savedPhotoId) => savedPhotoId !== photoId);
  localStorage.setItem('saved_photos', JSON.stringify(updatedSavedPhotoIds));

  return true;
};
