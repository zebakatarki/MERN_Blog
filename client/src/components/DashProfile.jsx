import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar'; //image circular package
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

export default function DashProfile() {
  const {currentUser, error} = useSelector((state)=>state.user);
  const [imageFile, setImageFile] = useState(null); //when the element triggered
  const [imageFileUrl, setImageFileUrl] = useState(null); //when the element triggered it aaccepts the url of image
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null); //
  const [imageFileUploadError, setImageFileUploadError] = useState(null); //error handler for uploading image
  const [imageFileUploading,setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);
  const [showModal,setShowModal] =useState(false);
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
  };

  const handleDeleteUser = async () =>{
    setShowModal(false);
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
    const data = await res.json();
    if(!res.ok){
      dispatch(deleteUserFailure(data.message));
    }else{
      dispatch(deleteUserSuccess(data));
    }
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  };

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
        <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
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
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
          <HiOutlineExclamationCircle className='h-14 w-14 text-grey-400 dark:text-gray-200 mb-4 mx-auto'/>
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h3>
          
          <div className="flex justify-center gap-4">
            <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
            <Button color='grey' onClick={()=> setShowModal(false)}>No, cancel</Button>
          </div>
          
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
  }
