// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const CreateSpotLink = () => {
    if (sessionUser) {
      return <NavLink exact to='/spots/new'>Create A Spot</NavLink>
    }
  }

  return (
    <ul className='nav-list'>
      <li className='nav-list-logo'>
        <NavLink exact to="/">
          <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1106002225421103195/download.png'></img>
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
