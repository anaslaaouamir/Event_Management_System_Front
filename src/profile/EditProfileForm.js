import { useState } from "react";

const EditProfileForm = ({name,setName,email,setEmail,setPassword,setPhoneNumber,phoneNumber,setConfirmPassword,handleSubmit})=>{

    

    return (

        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="col-md-3 control-label">Name:</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="form-group">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>  
              </div>

              <div className="form-group">
                <label className="col-lg-3 control-label">Phone Number:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>  
              </div>
  
              <div className="form-group">
                <label className="col-md-3 control-label">Password:</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter new Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="form-group">
                <label className="col-md-3 control-label">
                  Confirm password:
                </label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm your new Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="form-group">
                <label className="col-md-3 control-label"></label>
                <div className="col-md-8">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Save Changes"
                  />
                  <span> </span>
                  <input
                    type="reset"
                    className="btn btn-default"
                    value="Cancel"
                  />
                </div>
              </div>
        </form>
    );
}

export default EditProfileForm;