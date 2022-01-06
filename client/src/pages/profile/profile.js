import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { CloudinaryContext } from "cloudinary-react";
import { photosFetched } from "../../actions";
import PhotoListContainer from "./PhotoList";
import PhotosUploaderContainer from "./PhotosUploader";
import { fetchPhotos } from "../../utils/CloudinaryService";
import "./styles.css";
import "../../App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  width: 100%;
`;

const Header = styled.div`
  margin: 0 auto;
  font-family: var(--thin);
  font-size: clamp(3rem, 6vw, 8rem);
  text-align: center;
  color: rgb(240, 255, 255);
  letter-spacing: 0vw;
  line-height: 3rem;
`;

class App extends Component {
  componentDidMount() {
    fetchPhotos(this.props.cloudName).then(this.props.onPhotosFetched);
  }

  render() {
    return (
      <Container>
        <CloudinaryContext
          cloudName={this.props.cloudName}
          uploadPreset={this.props.uploadPreset}
        >
          <BrowserRouter>
            <Switch className="router">
              <Route exact path="/photo" component={PhotoListContainer} />
              <Route
                exact
                path="/photos/new"
                component={PhotosUploaderContainer}
              />
              <Redirect from="/" to="/photo" />
            </Switch>
          </BrowserRouter>
        </CloudinaryContext>
      </Container>
    );
  }
}

App.propTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
  onPhotosFetched: PropTypes.func,
};

const AppContainer = connect(null, { onPhotosFetched: photosFetched })(App);

export default AppContainer;
