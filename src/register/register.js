import Popup from '../pop_up';
import '../login/login.css'
import DataContext from '../context/DataContext';
import { useContext } from 'react';
import RegisterForm from './register_form';
import { Link } from 'react-router-dom';

const Register = () => {

    const { setAlert,alert } = useContext(DataContext);


    return (
        <>
        {alert && 
            <Popup alert={alert} setAlert={setAlert} />
            }
<center>
<div className="login-container">
        <div className="login-card">
            <div className="login-header">
                <h2>Sign Up</h2>
                <p>Create new Account</p>
            </div>

            <RegisterForm  setAlert={setAlert}/>
            
            

            <div className="signup-link">
                <center><p>You already have an account? 
                <Link to={`/login`}><a>Login</a></Link>
                </p></center>
            </div>

        </div> 
    </div>
</center>
</>
    )

}

export default Register;