import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './popupStyle.css'
import axios from 'axios';

const AddInstructorPopup = ({close,user,submitinstructor}) => {
    // const [successMsg, setSuccessMsg] = useState('');
    // const [disableBtn, setDisableBtn] = useState(false);
    // const [error,setError]=useState('');
    
    var token = localStorage.getItem('jwtToken');
    // Set the default headers for Axios to include the token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const sub = async (e) => {

      e.preventDefault();
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const url = `https://localhost:7035/api/User/AddInstructor?firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`;
  
      try {
        const response = await axios.post(url);
        if (response.data==="instructor added successfully") { // Assuming your response contains a property 'success'
          alert("instructor added successfully!");
          window.location.reload();
        //    setError('');
        //   setDisableBtn(true);
        }
      } catch (error) {
        console.log(error)
        //alert("Error occurred: instructor already exists.");
        // setError('Email already exist!');
        window.location.href = '/';
      }
    };
    return (
       <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"><h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Instructor</h2></div>
        <div className="content">
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={sub}>
            {/* <div style={{ marginBottom: '15px' }}>
                <label htmlFor="coursename" style={{ marginBottom: '5px' }}>Course Name:</label>
                <input type="text" id="coursename" name="coursename" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course name" />
            </div> */}
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <label htmlFor="firstname" style={{ marginBottom: '5px' }}>First Name</label>
                <input type="text" required placeholder='Enter first name...' style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} name="firstname" id="firstname" />
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <label htmlFor="lastname" style={{ marginBottom: '5px' }}>Last Name</label>
                <input type="text" required placeholder='Enter last name...' name="lastname" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} id="lastname" />
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <label htmlFor="email" style={{ marginBottom: '5px' }}>Email</label>
                <input type="email" required placeholder='Enter email...' style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} name="email" id="email" />
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <label htmlFor="password" style={{ marginBottom: '5px' }}>Password</label>
                <input type="password" required placeholder='Enter password...' name="password" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} id="password" />
            </div>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <input type="submit" value={"Create Instructor"}  style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}} />
            </div>
        </form>
        </div>
      </div> 
    )
      
};

{/*     <form className={styless.container} onSubmit={sub}>
     <div style={{ textAlign: 'center' }}>
       <img src={logo} alt="img" className={styless.img} />
     </div>
     <div className={styless.items}>
       <label htmlFor="firstname">First Name</label>
       <input type="text" required placeholder='Enter first name...' className={styless.textfield} name="firstname" id="firstname" />
     </div>
     <div className={styless.items}>
       <label htmlFor="lastname">Last Name</label>
       <input type="text" required placeholder='Enter last name...' name="lastname" className={styless.textfield} id="lastname" />
     </div>
     <div className={styless.items}>
       <label htmlFor="email">Email</label>
       <input type="email" required placeholder='Enter email...' className={styless.textfield} name="email" id="email" />
     </div>
     <div className={styless.items}>
       <label htmlFor="password">Password</label>
       <input type="password" required placeholder='Enter password...' name="password" className={styless.textfield} id="password" />
     </div>
     <p style={{ color: 'green',textAlign:'center', display: successMsg === '' ? 'none' : 'block' }}>{successMsg}</p>
	 <p style={{ color: 'red',textAlign:'center', display: error === '' ? 'none' : 'block' }}>{error}</p>
     <div>
       <input type="submit" value={"Create Instructor"} className={styless.button} style={{ display: disableBtn ? 'none' : 'block' }} />

     </div>
   </form> */}

export default AddInstructorPopup;