import { useState } from 'react';
import axios from 'axios';
import './styles/auth.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  
const { 
        URL, 
        userId, 
        setUserId,
        username, 
        setUsername,
        mail, 
        setMail,
        islogin, 
        setIslogin 
    } = useContext(SampleContext);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      console.log(res.data);
      setMessage('Signup successful ✅');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
      setMessage('Signup failed ❌');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
