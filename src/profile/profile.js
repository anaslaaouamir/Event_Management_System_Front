import { useContext, useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';
import './profile.css';
import DataContext from '../context/DataContext';
import axios from 'axios';
 
const Profile = () => {

  const {client,setClient,token} = useContext(DataContext);

    const [name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[error,setError]=useState("");

    useEffect(() => {
      if (client) {
        setName(client.name || "");
        setEmail(client.email || "");
        setPhoneNumber(client.phoneNumber || "");
      }
    }, [client]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
    
      try {

        const response = await axios.put(
          `http://localhost:9091/clients/${client.idClient}`,
          {
            name,
            email,
            phoneNumber,
            ...(password && password === confirmPassword ? { password } : {})
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        setClient(response.data);
        console.log("client: ",response.data);
      } catch (err) {
        console.error("Update error:", err);
        setError("Update failed");
      }
    };

  

    return (
      <div className="container">
        <h1>Edit Profile</h1>
        <hr />
  
        <div className="row">
          {/* left column */}
          <div className="col-md-3">
            <div className="text-center">
              <img
                src="https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
                className="avatar img-circle"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
  
              <input type="file" className="form-control" />
            </div>
          </div>
  
          {/* edit form column */}
          <div className="col-md-9 personal-info">
  
            <h3>Personal info</h3>
  
            <EditProfileForm client = {client} 
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
             />

          </div>
        </div>
  
        <hr />
      </div>
    );
  };
  
  export default Profile;
  