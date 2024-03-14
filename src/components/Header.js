import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  };

  return (
    <div className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img 
            className='w-44'
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
        />

        {user && (
          <div className='flex'>
            <img 
              className='w-8 h-8 my-5'
              src={user.photoURL}
              alt="user icon"
            />
            <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
          </div>
        )}
    </div>
  );
}

export default Header;
