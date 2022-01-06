import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openUploadWidget } from "../../utils/CloudinaryService";
import { photosUploaded } from "../../actions";
import Photo from "./Photo";
// import Userdashboard from "./Userdashboard";
import Header from "./Header";
import { CloudinaryContext } from "cloudinary-react";
import AvatarBio from "./AvatarBio";
import styled from "styled-components";
import { mobile } from "../../responsive"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  /* background-color: #3a6d9b; */
`;

const Main = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: flex-start;
  width: 90%;
  ${mobile({flexDirection: "column"})}
`;

const Button = styled.div`
  background-color: #428362;
  color: antiquewhite;
  border-radius: 10px;
  padding: .5rem;
  width: 200px;
  text-align: center;
  margin: 1rem auto;

`
const Text = styled.div`
  text-align: center;

  width: 100%;
`
const Photos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  width: 100%;
  text-align: center;
`

class PhotoList extends Component {
  render() {
    return (
      <Container>

        <Header />
        <Main>
   
          <Button className="upload_link"
          onClick={this.uploadImageWithCloudinary.bind(this)}
          >Upload
          </Button>

          <Photos>
            {this.props.photos.length === 0 && (
              <Text>No photos added yet</Text>
              )}
            {this.props.photos.map((photo) => {
              return (
                <Photo key={photo.public_id} publicId={photo.public_id} />
                );
              })}
          </Photos>

            <AvatarBio />
        </Main>
                </Container>
    );
  }

  uploadImageWithCloudinary() {
    const uploadOptions = { tags: ["myphotoalbum"], ...this.context };
    console.log(uploadOptions);

    openUploadWidget(uploadOptions, (error, result) => {
      if (!error) {
        const { event, info } = result;
        if (event === "success") {
          this.props.onPhotosUploaded([info]);
        }
      } else {
        console.log(error);
      }
    });
  }
}

PhotoList.contextType = CloudinaryContext.contextType;

PhotoList.propTypes = {
  photos: PropTypes.array,
  onPhotosUploaded: PropTypes.func,
};

const PhotoListContainer = connect((state) => ({ photos: state.photos }), {
  onPhotosUploaded: photosUploaded,
})(PhotoList);

export default PhotoListContainer;
