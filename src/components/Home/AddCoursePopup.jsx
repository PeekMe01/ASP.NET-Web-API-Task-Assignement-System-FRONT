import React from 'react';
import Popup from 'reactjs-popup';
import './popupStyle.css'

const AddCoursePopup = ({close,user,submitinstructor}) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"><h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Course</h2></div>
        <div className="content">
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => submitinstructor(e, user.userid)}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="coursename" style={{ marginBottom: '5px' }}>Course Name:</label>
                <input type="text" id="coursename" name="coursename" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course name" />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
        </form>
        </div>
      </div>
);

{/* <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2>Add Course:</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => submitinstructor(e, user.userid)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="coursename" style={{ marginBottom: '5px' }}>Course Name:</label>
          <input type="text" id="coursename" name="coursename" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course name" />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div> */}

export default AddCoursePopup;