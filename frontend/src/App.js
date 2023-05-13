import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

// my components
import SpotIndex from './components/Spots/LandingPage/SpotIndex'
import CurrentSpot from './components/Spots/ManageSpots/CurrentSpot'
import CreateNewSpot from './components/Spots/ManageSpots/Create_Spot/CreateNewSpot'
import SpotById from './components/Spots/SpotDetails/SpotById'
import SpotEdit from './components/Spots/ManageSpots/Update_Spot/SpotEdit'


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


/* For later */

/*


 */
