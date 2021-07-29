import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { openUploadWidget } from "../../utils/CloudinaryService";
import { photosUploaded } from "../../actions";
import Photo from "./Photo";
import Userdashboard from "./Userdashboard";
import Header from "./Header";
import { CloudinaryContext } from "cloudinary-react";
import AvatarBio from "./AvatarBio";
import "./styles.css";

class PhotoList extends Component {
  render() {
    return (
      <div>
        {" "}
        <Header />
        <div className="container">
          <div className="photoList">
            <div id="Userdashboard">
              <div className="actions">
                <button
                  className="upload_link"
                  onClick={this.uploadImageWithCloudinary.bind(this)}
                >
                  <h3>Upload</h3>
                </button>
              </div>
              <Userdashboard />
            </div>
            <div className="photos">
              {this.props.photos.length === 0 && (
                <p>No photos were added yet.</p>
              )}
              {this.props.photos.map((photo) => {
                return (
                  <Photo key={photo.public_id} publicId={photo.public_id} />
                );
              })}
            </div>
          </div>
          <AvatarBio />
        </div>
      </div>
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
