import React from 'react';
import Popup from 'reactjs-popup';
import './popupStyle.css'

const AddTaskPopup = ({close,submittask,courseid}) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"><h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Task</h2></div>
        <div className="content">
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => submittask(e, courseid)}>
                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <label htmlFor="taskname" style={{ marginBottom: '5px', color: '#555' }}>Task Name:</label>
                    <input type="text" id="taskname" name="taskname" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter task name" />
                </div>
                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10  }}>
                    <label htmlFor="taskdescription" style={{ marginBottom: '5px', color: '#555' }}>Task Description:</label>
                    <input type="text" id="taskdescription" name="taskdescription" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter task description" />
                </div>
                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10  }}>
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
      </div>
);

{/* <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Task</h2>
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
        </form> */}

export default AddTaskPopup;