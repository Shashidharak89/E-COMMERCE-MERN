import { useContext, useState } from 'react';
import axios from 'axios';
import './styles/auth.css';
import SampleContext from '../../contexts/SampleContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { URL, userId, setUserId,
        username, setUsername,
        mail, setMail,
        islogin, setIslogin } = useContext(SampleContext);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(URL + '/api/auth/login', form);
            console.log(res.data);
            setUsername(res.data.user.name);
            setIslogin(true);
            setMail(res.data.user.email);
            setUserId(res.data.user._id);
            setMessage('Login successful ✅');
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            console.error(err);
            setMessage('Login failed ❌');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
