import React from "react";
// import { Card } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { REMOVE_PHOTO } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { removePhotoId } from "../../utils/localStorage";
import Saved from "./Saved";
import "./savedStyles.css";
import styled from "styled-components";
import {mobile} from "../../responsive"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  /* width: 100vw; */
`;

const Header = styled.div`
  margin: 0 auto;
  font-family: var(--thin);
  font-size: clamp(4rem, 6vw, 8rem);
  text-align: center;
  color: rgb(240, 255, 255);
  letter-spacing: 0vw;
  line-height: 6vw;
  ${mobile({lineHeight: "13vw"})}
`
const ViewInfo = styled.div`
  margin-top: 2rem;
  display: flex;
`

const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const ImgCard = styled.div`
  margin: 2rem 2rem 2rem 2rem;
  border: 1px white solid;
  border-radius: 10px;
  padding: 1rem;
`
const Img = styled.div`

`

const ImgBody = styled.div`

`
const Title = styled.div`

`
const Text = styled.div`

`

const Button = styled.div`
background-color: #c54444;
border-radius: 10px;
padding: .5rem;
width: fit-content;
margin: 0 auto;
`


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
    <div className="container">
      <Container>
        <Header>{userData.username}'s <br/>Saved Photos</Header>
<ViewInfo>      
    {userData.savedPhotos?.length
          ? `Viewing ${userData.savedPhotos.length} saved ${
              userData.savedPhotos.length === 1 ? "photo" : "photos"
            }:`
          : "You have no saved photos!"}
</ViewInfo>

        {/* <Saved /> */}

        <ImgContainer>
        {userData.savedPhotos?.map((photo) => {
          return (
            <ImgCard key={photo.photoId} border="dark">
              {photo.image ? (
                <Img
                  src={photo.image}
                  alt={`The cover for ${photo.title}`}
                  variant="top"
                />
              ) : null}
              <ImgBody>
                <Title>{photo.title}</Title>
                <p className="small">Photographer: {photo.authors}</p>
                <Text>{photo.description}</Text>
                <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeletePhoto(photo.photoId)}
                >
                  Delete
                </Button>
              </ImgBody>
            </ImgCard>
          );
        })}
        </ImgContainer>
      </Container>
    </div>
  );
};

export default SavedPhotos;
