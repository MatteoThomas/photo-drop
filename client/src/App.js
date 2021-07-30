

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import SearchPhotos from './pages/SearchPhotos';
import SavedPhotos from './pages/SavedPhotos';
import Navbar from './components/Navbar';
import {setContext} from '@apollo/client/link/context'


import config from "./config/config";

import React, { Component } from "react";
import Nav from "../src/components/Nav/Nav";
import Profile from "../src/pages/profile/Profile.js";
import Home from "../src/pages/home/home";
import "./App.css";





const { cloud_name, upload_preset } = config;

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={SearchPhotos} />
            <Route exact path='/saved' component={SavedPhotos} />
            <Route exact path ='/profile'> <Profile cloudName={cloud_name} uploadPreset={upload_preset} />
            </Route>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;