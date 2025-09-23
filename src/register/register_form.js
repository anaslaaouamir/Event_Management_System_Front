import axios from 'axios';
import { useState, useContext } from 'react';
import '../login/login.css';
import { useNavigate } from 'react-router-dom';




const RegisterForm = ({setAlert}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        setError(''); // reset error

        try {
            const response = await axios.post('http://localhost:8888/CLIENT-SERVICE/register', {
                username: username,
                password: password,
                email:email,
                phoneNumber:phoneNumber,
                name:name,
                roles:['ROLE_USER']

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // ✅ If your backend returns JWT token in Authorization header
            const result = response.data;
            console.log("************");
            console.log(result);

            console.log('Reigster successful:', response.data);
            setAlert({
                type: "success",
                message: "Your Account is created, you can login now",
                show: true,
              });
            navigate("/login");

            // ✅ You can redirect user to dashboard here
        } catch (err) {
            console.error('Login error:', err);
            setError('Enter real data');
            setAlert({
                type: "error",
                message: "Something Happend try again!",
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
                <div className="input-wrapper">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Full Name</label>
                </div>
            </div>

            <div className="form-group">
                <div className="input-wrapper">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </div>

            <div className="form-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        id="Phone Number"
                        name="Phone Number"
                        required
                        autoComplete="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">PhoneNumber</label>
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

export default RegisterForm;
