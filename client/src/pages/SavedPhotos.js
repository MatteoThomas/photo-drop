  import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_PHOTO } from '../utils/mutations';
import Auth from '../utils/auth';
import { removePhotoId } from '../utils/localStorage';

const SavedPhotos = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removePhoto] = useMutation(REMOVE_PHOTO);

  const userData = data?.me || [];

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;


  // create function that accepts the photo's mongo _id value as param and deletes the photo from the database
  const handleDeletePhoto = async (photoId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(photoId);
    if (!token) {
      return false;
    }

    try {
      await removePhoto({
        variables: { photoId },
      });

      // upon success, remove photo's id from localStorage
      removePhotoId(photoId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData.username}'s saved photos!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
        {userData.savedPhotos?.length
            ? `Viewing ${userData.savedPhotos.length} saved ${
                userData.savedPhotos.length === 1 ? 'photo' : 'photos'
              }:`
            : 'You have no saved photos!'}
        </h2>
        <CardColumns>
          {userData.savedPhotos?.map((photo) => {
            return (
              <Card key={photo.photoId} border='dark'>
                {photo.image ? (
                  <Card.Img src={photo.image} alt={`The cover for ${photo.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                  <p className='small'>Authors: {photo.authors}</p>
                  <Card.Text>{photo.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeletePhoto(photo.photoId)}>
                    Delete this photo!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPhotos;