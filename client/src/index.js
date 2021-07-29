// import React from "react";
import React from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Profile from "./pages/profile/profile.js";
import PhotosListReducer from "./reducers/PhotosListReducer";
import UploadedPhotosReducer from "./reducers/UploadedPhotosReducer";
import config from "./config/config";

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  uploadedPhotos: UploadedPhotosReducer,
});

const store = createStore(rootReducer);
const { cloud_name, upload_preset } = config;

ReactDOM.render(
  <Provider store={store}>
    <Profile cloudName={cloud_name} uploadPreset={upload_preset} />
  </Provider>,
  document.getElementById("root")
);
