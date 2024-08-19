import React, { useState, } from 'react'
// require('dotenv').config();
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
const BackLink = process.env.REACT_APP_API_URL;


function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BackLink}/signin`, formData);
      localStorage.setItem('token', response.data.auth);
      const token = response.data.auth;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setMessage('No Account Found');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);

      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        navigate('/signup');
      } else {
        console.error('An unexpected error occurred. Please try again.');
      }
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-white  border border-white rounded">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Email'
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Password'
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">{loading ? < Rings /> : 'Sign In'}</button>
      </form>
      {message && <h1 className="mt-4 text-center text-red-600">{message}</h1>}
      <div className="mb-4">
        <Link to="/signup" >Create Account</Link>
      </div>
    </div>

  )
}

export default SignIn
