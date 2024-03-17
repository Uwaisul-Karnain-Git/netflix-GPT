import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    // An Event listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const { uid, email, displayName, photoURL }  = user;
            dispatch(addUser({uid, email, displayName, photoURL }));
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
      });

      // Unsubscribe 'onAuthStateChanged' event on component unmount
      return () => unsubscribe();
}, [])

  const handleSignOut = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
      navigate("/error");
    });
  };

  return (
    <div className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img 
            className='w-44'
            src={LOGO}
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
