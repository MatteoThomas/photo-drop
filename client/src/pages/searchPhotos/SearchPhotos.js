import React, { useState, useEffect } from "react";
import {
  // Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../../utils/auth";
import { savePhotoIds, getSavedPhotoIds } from "../../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_PHOTO } from "../../utils/mutations";
import axios from "axios";

import Results from "./Results";

import "./resultStyles.css";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  width: 100vw;
`;

const Header = styled.div`
  margin: 0 auto;
  font-family: var(--thin);
  font-size: clamp(4rem, 7vw, 8rem);
  color: rgb(240, 255, 255);
  letter-spacing: -0.5vw;
  line-height: 6vw;
  ${mobile({ lineHeight: "13vw" })}
`;

const SearchPhotos = () => {
  // create state for holding returned image data
  const [result, setResult] = useState([]);
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState('');
  const [photo, setPhoto] = useState("");

  const [clientId, setClientID] = useState(
    "aczCYkM2vBISaUTNddlmnXpXV8_2TYD5fAzxm_23vNM"
  );

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
    console.log(photo);

    try {
      const url =
        "https://api.unsplash.com/search/photos?page=1&query=" +
        photo +
        "&client_id=" +
        clientId;
      axios.get(url).then((response) => {
        setResult(response.data.results);
      });

      console.log(result);
      const photoData = result.map((photo) => ({
        photoId: photo.id,
        authors: photo.user.name || ["No Photographer to display"],
        title: photo.description,
        description: photo.alt_description || ["No description"],
        image: photo.urls.full || "",
      }));

      setResult(photoData);
      console.log(photoData);
      setPhoto("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a photo to our database
  const handleSavePhoto = async (photoId) => {
    // find the photo in `result` state by the matching id
    const photoToSave = result.find((photo) => photo.photoId === photoId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePhoto({
        variables: { photoData: { ...photoToSave } },
      });
      console.log("data:", data);
      console.log(savedPhotoIds);
      setSavedPhotoIds([...savedPhotoIds, photoToSave.photoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <Header>Photo Search</Header>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Form.Control
              name="photo"
              value={photo}
              onChange={(event) => setPhoto(event.target.value)}
              type="text"
              size="lg"
              placeholder="Search"
            />

            {/* <Button type="submit">Submit Search</Button> */}
          </Form.Row>
        </Form>
      </Container>

      <Container>
        <h2>{result.length ? `Viewing ${result.length} results:` : ""}</h2>
        {/* <div className="resultContainer">
          <Results />
        </div> */}
        <CardColumns>
          {result.map((photo) => {
            return (
              <Card key={photo.id} border="dark">
                {photo.urls.full ? (
                  <Card.Img
                    src={photo.urls.full}
                    alt={`The cover for ${photo.id}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{photo.description}</Card.Title>
                  <p className="small">Authors: {photo.user.username}</p>
                  <Card.Text>{photo.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPhotoIds?.some(
                        (savedPhotoId) => savedPhotoId === photo.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePhoto(photo.id)}
                    >
                      {savedPhotoIds?.some(
                        (savedPhotoId) => savedPhotoId === photo.id
                      )
                        ? "This photo has already been saved!"
                        : "Save this photo!"}
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
