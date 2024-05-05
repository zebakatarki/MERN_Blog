import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {

    let [signin,setSignin]=useState({
        email:"",
        password:"",
    });
    // let [errorMessage,setErrorMessage]=useState(null);
    // let [loading,setLoading]=useState(false);
    //loading and error from initialState and useSelector() is used to get info from global state coming from user slice name
    const {loading, error:errorMessage} = useSelector(state => state.user)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let signinHandler=(event)=>{
        // event.preventdefault();
        let fieldId = event.target.id; //element name
        let newValue=event.target.value; //entered value
        console.log("Field Id",fieldId); //fullName or userName 
        console.log("Value",newValue); //entered values

        setSignin((currele)=>{
            // currele[fieldId]=newValue;
            console.log("setSignin updating the signup value");//after each entered word
            currele[event.target.id]=event.target.value.trim();
            console.log("Returning values");
            return {...currele} //we cant make the changes in original obj so aft OR to keep previous changes safe
        })
    };

    //After submission of form
    let handleSubmit=async(event)=>{
        event.preventDefault(); //all the inputs values remains stay without getting ghosted refreshing
        
        if( !signin.email || !signin.password ){
          console.log("Self declared error");
          // return setErrorMessage('React Please Fill Out All Fields'); //not show the error on console
          return dispatch(signInFailure('Please fill out all the fields'));
        }

        console.log(signin);
        try{
          // setLoading(true);
          // setErrorMessage(null);
          dispatch(signInStart());


          // This line sends an HTTP request to the /api/auth/signup endpoint using the fetch() function and 
          //The response from the server will be stored in the variable res. 
          console.log("fetching api");
          const res=await fetch('/api/auth/signin',{
            method:"POST",
            headers:{'Content-Type' : 'application/json'},
            body : JSON.stringify(signin),
          });

          // This line extracts the JSON body content from the response (res) using the .json() method. 
          const data = await res.json();

          //id duplicate entries are present backend 
          if(data.success === false){
            console.log("Data.Success",data.success)
            // setLoading(false);
            // setErrorMessage('react : Invalid Cridentials'); //error on console
            dispatch(signInFailure(data.message));
          }
          // setLoading(false);
        
          if(res.ok){
            dispatch(signInSuccess(data)); //data===action.payload
            console.log(res);
            navigate('/');
          }

        }catch(error){
          //Client side error ex internet problem 
          console.log(error);
          // setErrorMessage(error.message);
          // setLoading(false);
          dispatch(signInFailure(error.message));
        }
    };

  return (
    <div className='min-h-screen mt-40'>

      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7'>

      <div className='flex-1'>
      <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg text-white'>MERNify</span>
      </Link>

      <p className='text-sm mt-5'>
        This is my mern stack project surely give me feedback of your experience on my LinkedIn account......
      </p>
      </div>

      <div className='flex-1'>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>

          {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
          }
          
          <div>
            <Label value='Your email '/>
            <TextInput type="email" placeholder='xyz@gmail.com' id='email' value={signin.email} onChange={signinHandler} name="email"/>
          </div>

          <div>
            <Label value='Your password '/>
            <TextInput type="password" placeholder='**********' id='password' value={signin.password} onChange={signinHandler} name="password"/>
          </div>

          <Button bg-gradient-to-r from-blue-500 to-blue-800 type='submit' disabled={loading}>
            {
              loading ? (
                <>
                  <Spinner size='sm'/>
                <span className='pl-3'>Loading....</span>
                </>
              ) : "Sign In"
            }
          </Button>

          <OAuth/>
        </form>

        <div className='flex gap-2 text-sm mt-5'>
          <span>Don't have an account?</span>
          <Link to='/signup' className='text-blue-500'>
            SignUp
          </Link>
        </div> 

      </div>
      </div> 
    </div>
  )
}