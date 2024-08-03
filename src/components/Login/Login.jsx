import React, { useState } from 'react';
import styles from './Login.module.css'; // Import CSS module styles
import logo from '../../img/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setcredentials] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       const response = await axios.post("http://localhost:5071/api/User/Login?email=" + email + "&password=" + password);
       var token = response.data.token;
       localStorage.setItem('jwtToken', token);
		if (response.data.message === "Logged in as user" ) {
				  setcredentials(false);
				  const user = response.data.user;
				  navigate('/home',{state:{user:user}})
		}
		else if( response.data.message === "Logged in as instructor"){
			 setcredentials(false);
				  const user = response.data.user;
				  navigate('/home',{state:{user:user}})
		}
		else if(response.data.message==="Logged in as admin"){
				  setcredentials(false);
				   const user = response.data.user;
				  navigate('/home',{state:{user:user}})
		}
		else
			setcredentials(true)
    } catch (error) {
      console.error('Error occurred:', error);
    
    }
  };

  return (
    <div className={styles.body}> 
      <form className={styles.container} onSubmit={handleSubmit}> 
        <div style={{textAlign:'center'}}> 
          <img src={logo} alt="img" className={styles.img} />
        </div>
        <div className={styles.items}> 
          <label htmlFor="email">Email</label>
          <input type="email" required placeholder='Enter email...' className={styles.textfield} name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.items}>
          <label htmlFor="password">Password</label>
          <input type="password" required placeholder='Enter password...' name="password" className={styles.textfield} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <p>Don't have an account?<Link style={{textDecoration:'none', color: '#0038FF'}} to="/SignUp"> Register here.</Link></p>
        </div>
		
		{credentials ? (
						  <div>
							<p style={{color:'red',textAlign:'center'}}>Incorrect email or password</p>
						  </div>
						) : null}
		
        <div>
          <input type="submit" value={"Sign In"} className={styles.button}/>
        </div>
      </form>
    </div>
  );
};

export default Login;
