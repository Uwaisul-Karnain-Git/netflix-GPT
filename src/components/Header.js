import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const showGPTSearch = useSelector(state => state.gpt.showGPTSearch);

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

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = e => {
    dispatch(changeLanguage(e.target.value));
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
            {showGPTSearch && (
              <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>
            )}
            <button className='py-2 px-4 my-2 mx-4 bg-purple-800 text-white rounded-lg'
              onClick={handleGPTSearchClick}>{ showGPTSearch ? 'Home' : 'GPT Search' }</button>
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
