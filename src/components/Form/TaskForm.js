import React from "react";

const TaskForm = ({ handleSubmit, value, setValue }) => { 
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Task"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary  " style={{ width: '120px' }}>

          Submit
        </button>
      </form >
    </>
  );
};

export default TaskForm;
