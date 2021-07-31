import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import SearchPhotos from './pages/SearchPhotos';
import SavedPhotos from './pages/SavedPhotos';
import Navbar from './components/Navbar';
import {setContext} from '@apollo/client/link/context'


import config from "./config/config";

import React  from "react";
import Profile from "../src/pages/profile/profile.js";
import Home from "../src/pages/home/home";
import Footer from './components/footer';
import Payment from './components/Payment'
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

console.log(client)

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
          <Footer/>
          <Switch>
            <Route exact path ='/Payment' component={Payment} />

    </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;