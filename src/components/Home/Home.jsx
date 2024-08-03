import styles from './Home.module.css'
import styless from '../SignUp/SignUp.module.css';
import React,{useState,useEffect} from 'react'
import logo from '../../img/logo.png';
import coursePic from '../../img/course.png'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import plus from '../../img/plus.png';
import Popup from 'reactjs-popup';
import AddCoursePopup from './AddCoursePopup';
import AddInstructorPopup from './AddInstructorPopup';

export default function Home() {

  var token = localStorage.getItem('jwtToken');
  // Set the default headers for Axios to include the token
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

	const location=useLocation();
	const navigate = useNavigate();
	const [user,setuser]=useState({});
	const [courses,setcourses]=useState([]);
  const [instructors, setInstructors]=useState([]);
	
	 useEffect(() => {
  const fetchData = async () => {
    if (!location.state || !location.state.user) {
      navigate('/');
    } else {
      setuser(prevUser => {
        const newUser = location.state.user;
        return newUser;
      });
      if (location.state.user.priviledge === "0") {
        try {
          const response = await axios.get(`https://localhost:7035/GetCoursesFromUser/${location.state.user.userid}`);
          setcourses(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching courses:', error);
        }
      } else if (location.state.user.priviledge === "1") {
        try {
          const response = await axios.get(`https://localhost:7035/api/Course/GetCoursesByInstructorId/${location.state.user.userid}`);
          setcourses(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching courses:', error);
        }
      } else {
        console.log("hello"); // kifak jawad?
        try {
          const response = await axios.get(`https://localhost:7035/api/User/GetInstructors`);
          setInstructors(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching instructors:', error);
        }
      }
    }
  };

  if(localStorage.getItem('jwtToken')===null){
    navigate('/');
  }

  fetchData();
}, [location.state, navigate]);

	const gotocourse=(courseid,coursename)=>{
		
		navigate('/course',{state:{courseid:courseid,coursename:coursename,user:user}})
		
	}
	const handleDelete = async (courseid) => {
		try {
			await axios.delete(`https://localhost:7035/api/Course/${courseid}`);
			window.location.reload();
			alert('course deleted successfully');
		} catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/');
      }
			console.error('Error deleting course:', error);
		}
	}

  const handleDeleteInstructor = async (userid) => {
		try {
			await axios.delete(`https://localhost:7035/api/User/${userid}`);
			window.location.reload();
			alert('instructor deleted successfully');
		} catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/');
      }
			console.error('Error deleting instructor:', error);
		}
	}
  
	const submitinstructor = (e, userid) => {
    e.preventDefault();
    let coursename = e.target.coursename.value;
    axios.post(`https://localhost:7035/api/Course?coursename=${coursename}&instructorid=${userid}`)
        .then(response => {
			 window.location.reload();
            alert('Course added successfully');
        })
        .catch(error => {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
			    alert('Error adding course');
            console.error('Error adding course:', error);
        });
}
	
	const Manager=()=>{
  return (
    // <div className={styless.body}>
    //   <form className={styless.container} onSubmit={sub}>
    //     <div style={{ textAlign: 'center' }}>
    //       <img src={logo} alt="img" className={styless.img} />
    //     </div>
    //     <div className={styless.items}>
    //       <label htmlFor="firstname">First Name</label>
    //       <input type="text" required placeholder='Enter first name...' className={styless.textfield} name="firstname" id="firstname" />
    //     </div>
    //     <div className={styless.items}>
    //       <label htmlFor="lastname">Last Name</label>
    //       <input type="text" required placeholder='Enter last name...' name="lastname" className={styless.textfield} id="lastname" />
    //     </div>
    //     <div className={styless.items}>
    //       <label htmlFor="email">Email</label>
    //       <input type="email" required placeholder='Enter email...' className={styless.textfield} name="email" id="email" />
    //     </div>
    //     <div className={styless.items}>
    //       <label htmlFor="password">Password</label>
    //       <input type="password" required placeholder='Enter password...' name="password" className={styless.textfield} id="password" />
    //     </div>
    //     <p style={{ color: 'green',textAlign:'center', display: successMsg === '' ? 'none' : 'block' }}>{successMsg}</p>
		// <p style={{ color: 'red',textAlign:'center', display: error === '' ? 'none' : 'block' }}>{error}</p>
    //     <div>
    //       <input type="submit" value={"Create Instructor"} className={styless.button} style={{ display: disableBtn ? 'none' : 'block' }} />

    //     </div>
    //   </form>
    // </div>
    <>
    <div className={styles.mainBody}>

      <h2 style={{ fontWeight:'bold', color: 'white' }}>Instructors {instructors.length}</h2>

      <div className={styles.coursesBox} >

      <div className={styles.coursesItem} >
        <div className={styles.coursesImageHolder} onClick={()=>{}}>
          <Popup
              trigger={<img src={plus} alt='coursepic' width={250} height={250} className={styles.coursePic}/>}
              modal
              nested
            >
            {close => (<AddInstructorPopup close={close} user={user} submitinstructor={submitinstructor}/>)}
          </Popup>
          {/* <img src={plus} alt='coursepic' width={250} height={250} className={styles.coursePic}/> */}
        </div>
        <div style={{ color: 'white', paddingTop: 5 }}>Add Instructor</div>
      </div>

      {instructors.map((instructor)=>(
        <div className={styles.coursesItem} >
          <div className={styles.coursesImageHolder} onClick={()=>{}}>
            <img src={coursePic} alt='coursepic' width={250} height={250} className={styles.coursePic}/>
          </div>
        <div style={{ color: 'white', paddingTop: 5 }}>{instructor.firstname} {instructor.lastname}</div>
        <div>
        {user.priviledge === "2" && (
          <input 
              type="button"
              value="Delete"
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
              }}
              onClick={() => handleDeleteInstructor(instructor.userid)}
            />
          
        )}

        </div>
        </div>				
        ))}
            
      </div>
    </div>
    </>
  );
	}
  return (
    <div className={styles.body} style={{ height: ((instructors.length<3&&user.priviledge==="2")||(courses.length<3&&(user.priviledge==="1"||user.priviledge==="0")))?'100vh':'100%' }}>
		
        <nav className={styles.nav}>
            <div className={styles.navitem1}>
                <img src={logo} alt="img" className={styles.img} />
                <h2>Welcome back, {user.priviledge === "0" ? "Student" : (user.priviledge === "1" ? "Instructor" : "admin")} {user.firstname} {user.lastname}</h2>
			      </div>
            <div>
                <button className={styles.button} onClick={()=> {
                  localStorage.removeItem('jwtToken');
                  navigate('/')}}>Logout</button>
            </div>
        </nav>
		{user.priviledge!=="2"?
        <div className={styles.mainBody}>

            <h2 style={{ fontWeight:'bold', color: 'white' }}>Courses {courses.length}</h2>
            
            <div className={styles.coursesBox} >

            
            {user.priviledge==="1"&&<div className={styles.coursesItem} >
              <div className={styles.coursesImageHolder} onClick={()=>{}}>
                <Popup
                    trigger={<img src={plus} alt='coursepic' width={250} height={250} className={styles.coursePic}/>}
                    modal
                    nested
                  >
                  {close => (<AddCoursePopup close={close} user={user} submitinstructor={submitinstructor}/>)}
                </Popup>
                {/* <img src={plus} alt='coursepic' width={250} height={250} className={styles.coursePic}/> */}
              </div>
              <div style={{ color: 'white', paddingTop: 5 }}>Add Course</div>
					  </div>}

					{courses.map((course)=>(
					 <div className={styles.coursesItem} >
						<div className={styles.coursesImageHolder} onClick={()=>{gotocourse(course.courseid,course.coursename)}}>
							<img src={coursePic} alt='coursepic' width={250} height={250} className={styles.coursePic}/>
						</div>
						<div style={{ color: 'white', paddingTop: 5 }}>{course.coursename}</div>
						<div>
						{user.priviledge === "1" && (
														<input 
																type="button"
																value="Delete"
																style={{
																	backgroundColor: 'red',
																	color: 'white',
																	padding: '10px 20px',
																	border: 'none',
																	borderRadius: '5px',
																	cursor: 'pointer',
																	fontWeight: 'bold',
																	marginTop: '10px',
																	boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
																}}
																 onClick={() => handleDelete(course.courseid)}
															/>
														
													)}
						
						</div>
					</div>				
					))}
               
            </div>
        </div>
		:(
			<Manager/>
		)}
							 {/* {user.priviledge === "1" ? 
     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2>Add Course:</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => submitinstructor(e, user.userid)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="coursename" style={{ marginBottom: '5px' }}>Course Name:</label>
          <input type="text" id="coursename" name="coursename" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course name" />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
	
    : <></>
} */}
      
    </div>
  )
}
