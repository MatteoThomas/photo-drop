import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { savePhotoIds, getSavedPhotoIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_PHOTO } from '../utils/mutations';
import axios from "axios"

const SearchPhotos = () => {
  // create state for holding returned google api data
  // const [result, setresult] = useState([]);
  const [searchResult, setResult] = useState([]);
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState('');
  const [photo, setPhoto] = useState("")

  const [clientId, setClientID] = useState("aczCYkM2vBISaUTNddlmnXpXV8_2TYD5fAzxm_23vNM")

  // create state to hold saved photoId values
  const [savedPhotoIds, setSavedPhotoIds] = useState(getSavedPhotoIds());

  const [savePhoto] = useMutation(SAVE_PHOTO);

  // set up useEffect hook to save `savedphotoIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePhotoIds(savedPhotoIds);
  });

  // create method to search for photos and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!photo) {
      return false;
    }
    console.log(photo)

    try {
      const url = "https://api.unsplash.com/search/photos?page=1&query="
            + photo + "&client_id=" + clientId;
      axios.get(url)
      .then((response) => {
        console.log(response)
        setResult(response.data.results)

    })   
      
      // if (!url.ok) {
      //   throw new Error('something went wrong!');
      // }
    

      // const { items } = await url.json();

      const photoData = searchResult.map((photo) => ({
        photoId: photo.id,
        authors: photo.user.name || ['No Photographer to display'],
        title: photo.description,
        description: photo.alt_description || ['No description'],
        image: photo.urls.full || '',
      }));

      console.log(photoData)
      setResult(photoData);
      setPhoto('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a photo to our database
  const handleSavePhoto = async (photoId) => {
    // find the photo in `result` state by the matching id
    const photoToSave = searchResult.find((photo) => photo.photoId === photoId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePhoto({
        variables: { photoData: { ...photoToSave } },
      });
      console.log('data:', data);
      console.log(savedPhotoIds);
      setSavedPhotoIds([...savedPhotoIds, photoToSave.photoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Photos!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='photo'
                  value={photo}
                  onChange={(event) => setPhoto(event.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Picture'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchResult.length
            ? `Viewing ${searchResult.length} results:`
            : 'Search for a photo to begin'}
        </h2>
        <CardColumns>
          {searchResult.map((photo) => {
            return (
              <Card key={photo.id} border='dark'>
                {photo.urls.full ? (
                  <Card.Img src={photo.urls.full} alt={`The cover for ${photo.id}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{photo.description}</Card.Title>
                  <p className='small'>Authors: {photo.user.username}</p>
                  <Card.Text>{photo.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPhotoIds?.some((savedPhotoId) => savedPhotoId === photo.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSavePhoto(photo.id)}>
                      {savedPhotoIds?.some((savedPhotoId) => savedPhotoId === photo.id)
                        ? 'This photo has already been saved!'
                        : 'Save this photo!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPhotos;