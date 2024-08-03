import React,{useState,useEffect} from 'react'
import styles from './Assignment.module.css'
import logo from '../../img/logo.png';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
const Assignment = () => {

	var token = localStorage.getItem('jwtToken');
	// Set the default headers for Axios to include the token
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const [fileName, setFileName] = useState('');
	const [user,setuser]=useState({});
	const[submitedusertasks,setsubmittedusertasks]=useState([]);
	const [task,settask]=useState({});
	const [turnin,setturnin]=useState(false);
	const [content,setContent]=useState('');
	const location=useLocation();
	const navigate = useNavigate();
	useEffect(() => {
  const fetchData = async () => {
    if (!location.state || !location.state.user || !location.state.task) {
      navigate('/');
    } else {
      setuser(prevUser => {
        const newUser = location.state.user;
        return newUser;
      });
     settask(location.state.task);
	  try {
          const response = await axios.get(`https://localhost:7035/api/TrackingTask/GetUsersByTask/${location.state.task.taskid}`);
          setsubmittedusertasks(response.data);
		  response.data.map((response) => {
						if (response.user.userid === location.state.user.userid) {
							setContent(response.content);
							setturnin(true);
							
						}
					});
        } catch (error) {
			if(error.response.status === 401){
				localStorage.clear();
				navigate('/');
			  }
          console.error('Error fetching tasks:', error);
        }
		
    }
  };
  fetchData();
}, [location.state, navigate]); 
	
	
	
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null); 
        }
    };
  return (
    <div className={styles.body}>
        <nav className={styles.nav}>
            <div className={styles.navitem1}>
                <img src={logo} alt="img" className={styles.img} />
                <h2>{task.taskname} </h2>
            </div>
            <div>
                <button className={styles.button} onClick={()=> {
                  localStorage.removeItem('jwtToken');
                  navigate('/')}}>Logout</button>
            </div>
        </nav>
        <div className={styles.mainBody}>
            <h2 style={{ fontWeight:'bold', color: 'white' }}>Description</h2>
            <h4 style={{  color: 'white',marginTop:'15px' }}>{task.taskdescription}</h4>
			<br/>
			<h2 style={{ fontWeight:'bold', color: 'white' }}>Due Date</h2>
            <h4 style={{  color: 'white',marginTop:'15px' }}>{task.duedate}</h4>
             <hr className={styles.separateLine}/>
			 
			 {user.priviledge === "1" ? (
			<div>
			<div style={{textAlign:'center'}}>
				<h1 style={{color:'white'}}>Submitting task students:</h1>
			</div>
				<table style={{ borderCollapse: 'collapse', width: '100%' }}>
					<thead>
						<tr style={{ borderBottom: '2px solid #333' }}>
							<th style={{ padding: '10px', textAlign: 'left',color:'white' }}>Email</th>
							<th style={{ padding: '10px', textAlign: 'left',color:'white' }}>First Name</th>
							<th style={{ padding: '10px', textAlign: 'left',color:'white' }}>Content</th>
						</tr>
					</thead>
					<tbody>
						{submitedusertasks.map((student, index) => (
							<tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
								<td style={{ padding: '10px', textAlign: 'left' }}>{student.user.email}</td>
								<td style={{ padding: '10px', textAlign: 'left' }}>{student.user.firstname}</td>
								<td style={{ padding: '10px', textAlign: 'left' }}>{student.content}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
        ) : (<>
             <div className={styles.submittedBoxAssignment}>
                <div >
                    <h2 style={{ fontWeight:'bold', color: 'white' }}>Your Work</h2>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <button 
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '10px 20px',
                                transition: 'background-color 0.3s, color 0.3s' // Add transition for smooth effect
                            }}
                            onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'black'; }}
                            onMouseOut={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }}
							 onClick={async () => {
				if(turnin){
					 try {
					  const response = await axios.post(`https://localhost:7035/api/TrackingTask/RemoveTaskSubmission?userId=${user.userid}&taskId=${task.taskid}&content=${content}`);
						 setturnin(false)
						 alert("task removed submission")
						} catch (error) {
							if(error.response.status === 401){
								localStorage.clear();
								navigate('/');
							  }
						  console.error('Error fetching tasks:', error);
						}
				}
				else{
					  try {
					  const response = await axios.post(`https://localhost:7035/api/TrackingTask/SubmitTask?userId=${user.userid}&taskId=${task.taskid}&content=${content}`);
						 setturnin(true)
					
						 alert("task submitted")
						} catch (error) {
							if(error.response.status === 401){
								localStorage.clear();
								navigate('/');
							  }
						  console.error('Error fetching tasks:', error);
						}
				}
    }}
                        >
						{turnin ? "Undo Turn in" : "Turn in"}
                    </button>
                </div>
             </div>
             <div >
						<textarea
								rows={4}
								cols={50}
								style={{
									padding: '12px',
									border: '1px solid #ccc',
									borderRadius: '6px',
									resize: 'vertical',
									width: '100%',
									marginTop: '20px',
									fontFamily: 'Arial, sans-serif',
									fontSize: '14px',
									lineHeight: '1.5',
									boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
									transition: 'border-color 0.3s, box-shadow 0.3s',
									outline: 'none',
									':focus': {
										borderColor: '#007bff',
										boxShadow: '0 2px 4px rgba(0, 123, 255, 0.25)',
									}
								}}
								placeholder="Enter your response here..."
								value={content}
								 onChange={(event) => setContent(event.target.value)}
								 readOnly={turnin}
							/>
			</div>

	</> )}
	 
        </div>
    </div>
  )
}

export default Assignment