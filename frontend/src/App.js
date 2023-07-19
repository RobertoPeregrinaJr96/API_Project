import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

// my components
import SpotIndex from './components/Spots/LandingPage/index'
import CurrentSpot from './components/Spots/ManageSpots/index'
import CreateNewSpot from './components/Spots/ManageSpots/Create_Spot/index'
import SpotById from './components/Spots/SpotDetails/index'
import SpotEdit from './components/Spots/ManageSpots/Update_Spot/index'
import UserReviews from "./components/MyReviews";
import Bookings from "./components/Bookings";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/reviews/current' component={UserReviews} />
        <Route exact path='/bookings/current' component={Bookings} />
        <Route exact path='/spots/current' component={CurrentSpot} />
        <Route exact path='/spots/new' component={CreateNewSpot} />
        <Route exact path='/spots/:id' component={SpotById} />
        <Route exact path='/spots/:id/edit' component={SpotEdit} />
        <Route exact path='/' component={SpotIndex} />
      </Switch>}
    </>
  );
}

export default App;
