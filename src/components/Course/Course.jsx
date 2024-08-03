import React,{useState,useEffect} from 'react'
import styles from './Course.module.css'
import logo from '../../img/logo.png';
import plus from '../../img/plus.png';
import assignmentPic from '../../img/assignment.png'
import studentimg from '../../img/student.png'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import AddTaskPopup from './AddTaskPopup';
import './popupStyle.css'


const Course = () => {

  var token = localStorage.getItem('jwtToken');
  // Set the default headers for Axios to include the token
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

	const location=useLocation();
	const navigate = useNavigate();
	const [user,setuser]=useState({});
	const [tasks,settasks]=useState([]);
	const [students,setstudents]=useState([]);
	const[coursename,setcoursename]=useState('');
	const [allstudents,setallstudents]=useState([]);
	const[courseid,setcourseid]=useState();
	 const [selectedStudents, setSelectedStudents] = useState([]);
	useEffect(() => {
  const fetchData = async () => {
    if (!location.state || !location.state.user || !location.state.courseid || !location.state.coursename) {
      navigate('/');
    } else {
		setcoursename(location.state.coursename);
		setcourseid(location.state.courseid);
      setuser(prevUser => {
        const newUser = location.state.user;
        return newUser;
      });
        try {
          const response = await axios.get(`https://localhost:7035/api/Tasks/GetTasksFromCourse/${location.state.courseid}`);
          settasks(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching tasks:', error);
        }
       try {
          const response = await axios.get(`https://localhost:7035/GetStudentsFromCourse/${location.state.courseid}`);
          setstudents(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching students:', error);
        }
		
		try {
      console.log(user)
            const response = await axios.get(`https://localhost:7035/api/User/GetStudents`);
            setallstudents(response.data);
        } catch (error) {
          if(error.response.status === 401){
            localStorage.clear();
            navigate('/');
          }
          console.error('Error fetching students:', error);
        }
		
		
    }
  };

  if(localStorage.getItem('jwtToken')===null){
    navigate('/');
  }

  fetchData();
}, [location.state, navigate]); 
	 
	 const submittask=(e,courseid)=>{
		  e.preventDefault();
			const taskName = e.target.elements.taskname.value;
			const taskDescription = e.target.elements.taskdescription.value;
			const taskDueDate = e.target.elements.taskduedate.value;
		const url = `https://localhost:7035/api/Tasks/${courseid}/AddTask?taskname=${taskName}&taskdescription=${taskDescription}&duedate=${taskDueDate}`;
				axios.post(url)
				  .then(response => {
					alert('task added successfully');
					window.location.reload();
				  })
				  .catch(error => {
					  alert('task not added ');
            if(error.response.status === 401){
              localStorage.clear();
              navigate('/');
            }
					console.error('Error adding task:', error);
				  });
		
	 }
	 const handleDelete=async (taskid)=>{
		 console.log(taskid)
		  try {
        const response = await axios.delete(`https://localhost:7035/api/Tasks/${taskid}`);
       alert('task delete successfully');
	   window.location.reload();
    } catch (error) {
        alert('task not delete ');
        if(error.response.status === 401){
          localStorage.clear();
          navigate('/');
        }
        console.error('An error occurred while deleting the task:', error.message);
    }
	 }
	 const deleteStudent = async (userId, courseId) => {
    try {
        console.log(userId)
		console.log(courseId)
       await axios.delete(`https://localhost:7035/RemoveStudentFromCourse?courseId=${courseId}&userId=${userId}`);
		window.location.reload();
        alert('student removed successfully');
    } catch (error) {
        alert('student not removed');
        if(error.response.status === 401){
          localStorage.clear();
          navigate('/');
        }
        console.error('Error removing student from the course:', error);
    }
};

const handleCheckboxChange = (studentId) => {
    // Check if the studentId is already selected
    const isSelected = selectedStudents.includes(studentId);

    if (isSelected) {
      // If already selected, remove it from the array
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      // If not selected, add it to the array
      setSelectedStudents([...selectedStudents, studentId]);
    }
	
  };
  const addstudents=async(courseid,students)=>{
	  try {
		  const studentIdsParam = students.map(studentId => `studentIds=${studentId}`).join('&');
		  const response = await axios.post(`https://localhost:7035/AddStudents?courseId=${courseid}&${studentIdsParam}`);
		  alert('Students added to the course');
		  window.location.reload();
		} catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/');
      }
		  console.error('Error adding students:', error);
		}
	  
	  
	  
  }
	 
  return (
    <div className={styles.body}>
        <nav className={styles.nav}>
            <div className={styles.navitem1}>
                <img src={logo} alt="img" className={styles.img} />
                <h2>{coursename}</h2>
            </div>
            <div>
                <button className={styles.button} onClick={()=> {
                  localStorage.removeItem('jwtToken');
                  navigate('/')}}>Logout</button>
            </div>
        </nav>
        <div className={styles.mainBody}>

			<h2 style={{ fontWeight:'bold', color: 'white' }}>Assignments ({tasks.length})</h2>

      <div className={styles.assignmentBox}>

        {user.priviledge==="1"&&<div className={styles.assignmentItem}>
          <div className={styles.assignmentImageHolder} onClick={()=>{}}>
          <Popup
            trigger={<img src={plus} alt='assignmentPic' width={150} height={150} className={styles.assignmentPic}/>}
            modal
            nested
          >
            {close => (<AddTaskPopup close={close} submittask={submittask} courseid={courseid}/>)}
          </Popup>
              {/* <img src={plus} alt='assignmentPic' width={150} height={150} className={styles.assignmentPic}/> */}
          </div>
          <div style={{ color: 'white', paddingTop: 5 }}>Add Assignment</div>
				</div>}
        
				{tasks.map((task)=>(
				<div className={styles.assignmentItem}>
                    <div className={styles.assignmentImageHolder} onClick={()=>navigate('/task',{state:{task:task,user:user}})}>
                        <img src={assignmentPic} alt='assignmentPic' width={150} height={150} className={styles.assignmentPic}/>
                    </div>
                    <div style={{ color: 'white', paddingTop: 5 }}>{task.taskname}</div>
					
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
																 onClick={() => handleDelete(task.taskid)}
															/>
														
													)}
						
						</div>
					
                </div>
				))}
                
      </div>
			{/* {user.priviledge === "1" ? 
    <div style={{ maxWidth: '400px', margin: '0 auto',marginTop:'20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Task</h2>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => submittask(e, courseid)}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="taskname" style={{ marginBottom: '5px', color: '#555' }}>Task Name:</label>
                <input type="text" id="taskname" name="taskname" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter task name" />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="taskdescription" style={{ marginBottom: '5px', color: '#555' }}>Task Description:</label>
                <input type="text" id="taskdescription" name="taskdescription" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter task description" />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="taskduedate" style={{ marginBottom: '5px', color: '#555' }}>Due Date:</label>
                <input 
                    type="datetime-local" 
                    id="taskduedate" 
                    name="taskduedate" 
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    placeholder="Enter due date" 
                />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
        </form>
    </div>
: <></>} */}
        </div>
    <hr className={styles.separateLine}/>
        <div className={styles.mainBody}>

            <h2 style={{ fontWeight:'bold', color: 'white' }}>Students ({students.length})</h2>

            <div className={styles.assignmentBox}>
    {students.map((student) => (
        <div className={styles.assignmentItem} key={student.userid}>
            <div className={styles.assignmentImageHolder}>
                <img src={studentimg} alt='studentPic' width={150} height={150} className={styles.assignmentPic}/>
            </div>
            <div style={{ color: 'white', paddingTop: 5 }}>{student.firstname}</div>
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
                    onClick={() => deleteStudent(student.userid, courseid)}
                />
            )}
        </div>
    ))}
	
	
</div>
				
		<div style={{marginTop:"20px"}}>
							{user.priviledge === "1" && (
								  <div>
									<table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
									  <thead>
										<tr>
										  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Email</th>
										  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>First Name</th>
										  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Select</th>
										</tr>
									  </thead>
									  <tbody>
										{allstudents
										.filter(student => students.every(s => s.email !== student.email))
										.map((student) => (	
										  <tr key={student.id}>
											<td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email}</td>
											<td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.firstname}</td>
											<td style={{ border: '1px solid #ddd', padding: '8px' }}>
											  <input
												type="checkbox"
												onChange={() => handleCheckboxChange(student.userid)}
												checked={selectedStudents.includes(student.userid)}
											  />
											</td>
										  </tr>
										))}
									  </tbody>
									</table>
									<div style={{textAlign:'center',marginTop:"20px"}}>
									<input type="button" value="Add Students" style={{
												padding: '20px 40px',
												backgroundColor: 'red',
												color: 'white',
												border: 'none',
												borderRadius: '4px',
												cursor: 'pointer',
												fontWeight: 'bold',
												boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
											  }}
											  onClick={()=>addstudents(courseid,selectedStudents)}
											  />
											  </div>
								  </div>
								)}
		</div>
				
			
        </div>


    </div>
  )
}

export default Course