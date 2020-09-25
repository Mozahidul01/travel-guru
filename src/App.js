import React, { useState, createContext } from 'react';
import './App.css';
import {Switch,Route, BrowserRouter} from "react-router-dom";
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import Booking from './Component/Booking/Booking';
import NotFound from './Component/NotFound/NotFound';
import Hotels from './Component/HotelInfo/HotelInfo';
import Places from './FakeData/Places';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const PlaceContext = createContext();

function App() {
  const [place, setPlace] = useState(Places[0]);
  const [loggedInUser, setLoggedInUser] = useState({})
  
  return (
    <PlaceContext.Provider value={[place, setPlace, loggedInUser, setLoggedInUser]} >

      <BrowserRouter>
          <Header></Header>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/travel/:id">
            <Booking></Booking>
          </Route>
          <PrivateRoute path="/hotels">
            <Hotels></Hotels>
          </PrivateRoute>
          <Route path="/login">
             <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
            </Route>
        </Switch>
      </BrowserRouter>
      
    </PlaceContext.Provider>
  );
}

export default App;
