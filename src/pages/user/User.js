import React, {useState, useEffect, useCallback} from 'react';
import './User.css';
import { get, getURL, put } from '../../service/api';
import {useDropzone} from 'react-dropzone'
import auth from '../../service/auth';
import axios from 'axios';
import Header from '../../components/header/Header';
import TextInput from '../../components/text-input/TextInput';


const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchUserProfile = () => {
    const url = auth.isUserAdmin() ? 'admin' : 'general-user'
    get(`${url}/${auth.getLoggedUserUID()}`).then(res => {
      const data = res.data;
      setUserProfile(data)

      if(auth.isUserAdmin()) {
        setFirstName(data.firstname)
        setLastName(data.lastname)
      } else {
        setUserName(data.username)
      }      
    })

    get(`users/${auth.getLoggedUserUID()}`).then(res => {
      const data = res.data;
      setEmail(data.email)
      setPassword(data.password)
    })

    
  }


  const handleSubmit = () => {
    put(`users/${auth.getLoggedUserUID()}`, {email, password})
    .then(res => console.log(res)).catch(err => console.log(err))
  }

  const handlePasswordChange = (id, val) => {
    setPassword(val)
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])

  return (
    <div className="user-profile-content">
      {!auth.isUserAdmin() && <div className="user-image">
        <div className="user-image-container">
          {userProfile.profileImage ? 
            <img 
              src={`${getURL()}general-user/${userProfile.uid}/image/download`} 
              alt="profileimage"
            /> 
          :
            <img 
              src="https://www.securities-services.societegenerale.com/uploads/tx_bisgbio/default-profile.png" 
              alt="profileimage"
            />
          }
        </div>
        <div className="upload-area">
          <MyDropzone uid={userProfile.uid}/>
        </div>
      </div>}
      <div className="user-profile">
        <h3>Profile Information</h3>
        <div className="profile-content">
          <TextInput 
            id="email"
            label={email}
            value={email}
            onChange={setEmail}
            disableEnter={true}
            locked={true}
          />
          <TextInput 
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disableEnter={true}
          />
          {auth.isUserAdmin() && <TextInput 
            id="firstname"
            label={firstName}
            value={firstName}
            onChange={setFirstName}
            disableEnter={true}
            locked={true}
          />}
          {auth.isUserAdmin() && <TextInput 
            id="lastname"
            label={lastName}
            value={lastName}
            onChange={setLastName}
            disableEnter={true}
            locked={true}
          />}
          {!auth.isUserAdmin() && <TextInput 
            id="username"
            label={username}
            value={username}
            onChange={setUserName}
            disableEnter={true}
            locked={true}
          />}
          <button onClick={() => handleSubmit()}>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

function MyDropzone({ uid }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const formData = new FormData()
    formData.append("file", file);

    axios.post(
      `${getURL()}general-user/${uid}/image/upload`, 
      formData, 
      {
         headers: { "Content-Type": "multipart/form-data" }
      }
    ).catch(err => console.log(err))
  }, [uid])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={{cursor: "pointer", width: "100%", height: "100%"}}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the profile image here ...</p> :
          <p>Upload Profile Image</p>
      }
    </div>
  )
}

const User = props => {
  return [
    <Header {...props}/>,
    <div className="user-page">
      <UserProfile />
    </div>
  ]  
}

export default User;