import React, { Component } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { openUploadWidget } from "./utils/CloudinaryService";
import { photosUploaded } from "./actions";
import Photo from "./Photo";
import Header from "./Header";
import { CloudinaryContext } from "cloudinary-react";

class PhotoList extends Component {
  render() {
    return (
      <div className="photoList">
        <Header />
        <h1>Your Photos</h1>
        <div className="actions">
          <p
            className="upload_link"
            onClick={this.uploadImageWithCloudinary.bind(this)}
          >
            Upload multiple images
          </p>
        </div>
        {/* can't get single upload page to work, crashes app */}
        {/* <div className="actions">
          <NavLink className="upload_link" exact to="/photos/new">
            Upload a single image
          </NavLink>
        </div> */}
        <div className="photos">
          {this.props.photos.length === 0 && <p>No photos were added yet.</p>}
          {this.props.photos.map((photo) => {
            return <Photo key={photo.public_id} publicId={photo.public_id} />;
          })}
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
