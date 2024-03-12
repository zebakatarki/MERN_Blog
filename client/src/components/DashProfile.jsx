import { Button, TextInput, Alert } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar'; //image circular package
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const {currentUser} = useSelector((state)=>state.user);
  const [imageFile, setImageFile] = useState(null); //when the element triggered
  const [imageFileUrl, setImageFileUrl] = useState(null); //when the element triggered it aaccepts the url of image
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null); //
  const [imageFileUploadError, setImageFileUploadError] = useState(null); //error handler for uploading image
  const [imageFileUploading,setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);
  const [formData,setFromData] = useState({});

  console.log("imageFileUploadingProgress=",imageFileUploadProgress,"imageFileUploadError=",imageFileUploadError);

  const filePickerRef = useRef(); //input of type='file' functionality on clicking the profile image
  const dispatch = useDispatch();

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); //creates the url of image for local host 
    }
  };

  console.log("imageFile=",imageFile,"imageFileUrl=",imageFileUrl);
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile]); //whnevr changes happen in the image File the useEffect will come to play
  
  const uploadImage = async()=>{
    console.log("Uploading Image");
    //Code of image from firebase
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app); 
    const fileName = new Date().getTime() + imageFile.name; //bcz the 2 people can hv same imageFile.name to make it unique we added date and time
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //progress is  10.123456
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error)=>{
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
          setFromData({...formData,profilePicture: downloadURL});  
          setImageFileUploading(false);
        }
        );
      }
    );
  };

  const handleChange = (e) =>{
    setFromData({...formData,[e.target.id] : e.target.value});
  };

  console.log(formData);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length === 0){
      setUpdateUserError("No changes made");
      return;
    }
    if(imageFileUploading){
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try{
      dispatch(updateStart());
      console.log("Try Current USer",currentUser._id);
      const res = await fetch(`api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type' : "application/json",
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    }catch(error){
      console.log("Fail catch current user",currentUser._id);
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }

  return (
    <div className='text-black  max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type='file' accept='image/=' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>

        {imageFileUploadProgress && (
          <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
          strokeWidth={5}
          styles={{
            root:{
              width:'100%',
              height:'100%',
              position: 'absolute',
              top:0,
              left:0,
            },
            path:{
              stroke:`rgba(62,154,199, ${imageFileUploadProgress / 100})`,
            },
          }}
          />
        )}

        <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>

        {imageFileUploadError && <Alert color='failure'> {imageFileUploadError} </Alert> }
        
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />

        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />

        <TextInput type='password' id='password' placeholder='********' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <spam className="cursor-pointer">Delete Account</spam>
        <spam className="cursor-pointer">Sign Out</spam>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
    </div>
  );
  }
