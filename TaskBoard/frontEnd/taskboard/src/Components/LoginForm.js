import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
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

    //fetch api
      fetch('https://taskboard-mern.onrender.com/login', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }).then(res=> res.json()).then(data => {
        //  authentication logic based on the response
      if (data.success) {
        console.log('Login successful!');
        window.alert('Login successful!');
        
      } else {
        console.log('Login failed. Invalid credentials.');
        window.alert('Login failed. Invalid credentials.');
      }
    
      })   

  };

  return (

    //login form
    <div className="login-form">
      <h2>Login Form</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  }
export default LoginForm;
