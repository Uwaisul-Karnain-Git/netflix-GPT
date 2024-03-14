import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const errorMsg = checkValidateData(isSignInForm, name.current?.value, email.current?.value, password.current?.value);
        setErrorMessage(errorMsg);
        
        if(errorMsg) return;

        // Sign in / Sign up users
        if(!isSignInForm) {
            // Signing up
            createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current?.value, photoURL: "https://avatars.githubusercontent.com/u/78413138?v=4"
                    }).then(() => {
                        // Fetch updated user details from 'auth'
                        const { uid, email, displayName, photoURL }  = auth.currentUser;
                        dispatch(addUser({uid, email, displayName, photoURL }));
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        } else {
            // Signing in
            signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
        <Header/>
        <div className='absolute'>
            <img 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/1bbd2f1c-7a12-4e40-9e9c-603d24709661/LK-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt="logo"
            />
        </div>
        <form onSubmit={e => e.preventDefault()}
            className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            
            {!isSignInForm && (
                <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
            )}

            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
            
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{
                isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}
            </p>
        </form>
        </div>
  );
}

export default Login;
