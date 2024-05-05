import { Button } from 'flowbite-react';
import React from 'react';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'; //OAuth
import {app} from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    //app is coming from firebase.js
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async()=>{
    const provider = new GoogleAuthProvider();
    //To avoid authentication process everytime like if you authenticate our account once next time if we choose continue with google it ll signup directly
    provider.setCustomParameters({prompt: 'select_account'});
    //To open pop-up window of accounts
    try{
        const resultsFromGoogle = await signInWithPopup(auth, provider);
        console.log(resultsFromGoogle);
        const res = await fetch('api/auth/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
        })
        const data = await res.json()
        if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/');
        }
    }catch(error){
        console.log(error);
    }
}

  return (
    <Button type='button' bg-gradient-to-r from-blue-500 to-blue-800 outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )
}
