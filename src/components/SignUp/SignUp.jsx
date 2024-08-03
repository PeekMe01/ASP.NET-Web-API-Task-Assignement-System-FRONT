import React, { useState } from 'react';
import styles from './SignUp.module.css';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [successMsg, setSuccessMsg] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [error,setError]=useState('');
  const sub = async (e) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const url = `https://localhost:7035/api/User?firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`;

    try {
      const response = await axios.post(url);
      if (response.data==="user added successfully") { // Assuming your response contains a property 'success'
        setSuccessMsg("Student added successfully!");
		 setError('');
        setDisableBtn(true);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Email already exist!');
    }
  };

  return (
    <div className={styles.body}>
      <form className={styles.container} onSubmit={sub}>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="img" className={styles.img} />
        </div>
        <div className={styles.items}>
          <label htmlFor="firstname">First Name</label>
          <input type="text" required placeholder='Enter first name...' className={styles.textfield} name="firstname" id="firstname" />
        </div>
        <div className={styles.items}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" required placeholder='Enter last name...' name="lastname" className={styles.textfield} id="lastname" />
        </div>
        <div className={styles.items}>
          <label htmlFor="email">Email</label>
          <input type="email" required placeholder='Enter email...' className={styles.textfield} name="email" id="email" />
        </div>
        <div className={styles.items}>
          <label htmlFor="password">Password</label>
          <input type="password" required placeholder='Enter password...' name="password" className={styles.textfield} id="password" />
        </div>
        <div>
          <p>Don't have an account?<Link style={{ textDecoration: 'none', color: '#0038FF' }} to="/"> Login here.</Link></p>
        </div>
        <p style={{ color: 'green',textAlign:'center', display: successMsg === '' ? 'none' : 'block' }}>{successMsg}</p>
		<p style={{ color: 'red',textAlign:'center', display: error === '' ? 'none' : 'block' }}>{error}</p>
        <div>
          <input type="submit" value={"Sign Up"} className={styles.button} style={{ display: disableBtn ? 'none' : 'block' }} />

        </div>
      </form>
    </div>
  );
};

export default SignUp;
