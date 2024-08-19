import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
const BackLink = process.env.REACT_APP_API_URL || 'http://localhost:4000';


function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BackLink}/signup`, formData);
      navigate('/');
    } catch (error) {
      console.error('There was an error registering!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-auto mt-10 bg-white shadow-white  border border-white rounded">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className="mb-4">
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Name'
            required
          />
        </div>
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">{loading ? < Rings /> : 'Sign Up'}</button>
      </form>
      <div className="mb-4">
        <label className="block mt-2">Already have an account?</label>
        <Link to="/signin" >Sign In</Link>
      </div>
    </div>
  );

}

export default SignUp
