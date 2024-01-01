import React, { useState } from 'react';

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =  (e) => {
   e.preventDefault();
    
   //fetch api call for registration
     fetch("https://taskboard-mern.onrender.com/register",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name: formData.name, 
        email: formData.email, 
        password: formData.password
      })

    }).then(res=> res.json())
    .then(data => {
      if(data.status === 200 || !data){
        window.alert("Invalid Registration");
      }
      else{
        window.alert(" Registration Successful");
      }
    })  

};

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <button type="submit" onClick ={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
