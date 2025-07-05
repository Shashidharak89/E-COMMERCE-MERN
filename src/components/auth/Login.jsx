import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SampleContext from '../../contexts/SampleContext';
import './styles/Login.css';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
        setIsLoading(true);
        setMessage('');
        
        try {
            const res = await axios.post(URL + '/api/auth/login', form);
            console.log(res.data);
            setUsername(res.data.user.name);
            setIslogin(true);
            setMail(res.data.user.email);
            setUserId(res.data.user._id);
            setMessage('Login successful ✅');
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem('userid', res.data.user._id); // ✅ Store correct userid for reference
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            console.error(err);
            setMessage('Login failed ❌');

            
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-header">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input 
                                name="email" 
                                type="email" 
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange} 
                                required 
                                className="form-input"
                            />
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <input 
                                name="password" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange} 
                                required 
                                className="form-input"
                            />
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <circle cx="12" cy="16" r="1"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                            </div>
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {message && (
                    <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <div className="login-footer">
                    <p className="signup-link">
                        Don't have an account? 
                        <Link to="/signup" className="link-text">Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;