import './login.css'
import LoginForm from './login_form';
const Login = () => {

    return (
<center>
<div className="login-container">
        <div className="login-card">
            <div className="login-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
            </div>

            <LoginForm/>
            
            

            <div className="signup-link">
                <center><p>Don't have an account? <a href="#">Create one</a></p></center>
            </div>

        </div>
    </div>
</center>
    )

}

export default Login;