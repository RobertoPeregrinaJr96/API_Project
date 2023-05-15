// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const user = useSelector(state => state.session.user)

  const isLogin = (user) => {
    if (!user) return null
    else return <NavLink exact to='/spots/new' className='nav-create-spot'>Create A New Spot&#160;&#160;&#160;&#160;</NavLink>
  }

  useEffect(() => {
    console.log('Navigation')
  }, [])
  return (
    <ul className='nav-list'>
      <li className='nav-list-logo'>
        <div className='nav-link-div'>
          <NavLink exact to="/">
            <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1106002225421103195/download.png' alt=''></img>
            SRC
          </NavLink>
        </div>
      </li>
      {isLoaded && (
        <li className='nav-landingPage'>
          {/* <NavLink exact to='/spots/new'>Create A Spot</NavLink> */}
          {isLogin(user)}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
