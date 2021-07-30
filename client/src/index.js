// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import Profile from "./pages/profile/Profile.js";
import PhotosListReducer from "./reducers/PhotosListReducer";
import UploadedPhotosReducer from "./reducers/UploadedPhotosReducer";
import APP from './App'

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  uploadedPhotos: UploadedPhotosReducer,
});

const store = createStore(rootReducer);


ReactDOM.render(
  <Provider store={store}>
    <APP/>
  </Provider>,
  document.getElementById("root")
);
