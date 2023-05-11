// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import spotsReducer from '../../store/spotReducer';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const spotId = useParams()
  const history = useHistory()

  function refreshPage() {
    if (!spotId) {
      return null
    }
    if (spotId) {
      history.push(`/spots/${spotId}`)
      // window.location.reload()
      // window.location.href=`/spots/${spotId}`
    }
  }

  const CreateSpotLink = () => {
    if (sessionUser) {
      return <NavLink exact to='/spots/new'
        onClick={refreshPage}>Create A Spot</NavLink>
    }
  }

  return (
    <ul className='nav-list'>
      <li className='nav-list-logo'>
        <NavLink exact to="/">
          <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1106002225421103195/download.png' alt=''></img>
          SRC
        </NavLink>
      </li>
      <li>
        <CreateSpotLink />
      </li>
      {isLoaded && (
        <li className='nav-landingPage'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
