import axios from 'axios';
import { useState, useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';




const LoginForm = ({login,setAlert}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        setError(''); // reset error

        try {
            const response = await axios.post('http://localhost:8888/CLIENT-SERVICE/login', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // ✅ If your backend returns JWT token in Authorization header
            const token = response.data;
            console.log("************");
            console.log(token);
            if (token) {
                login(token);
            }

            console.log('Login successful:', response.data);
            navigate("/");
            // ✅ You can redirect user to dashboard here
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid username or password');
            setAlert({
                type: "error",
                message: "Invalid username or password!",
                show: true,
              });
        }

    };

    return (
        <form className="login-form" id="loginForm" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>
            </div>

            <div className="form-group">
                <div className="input-wrapper password-wrapper">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" className="login-btn">
                <span className="btn-text">Sign In</span>
            </button>
        </form>
    ); 
};

export default LoginForm;
