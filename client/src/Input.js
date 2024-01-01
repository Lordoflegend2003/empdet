import React, { useState } from "react";

const Input = ({ emp }) => {
  const [empdetails, setEmpdetails] = useState(emp || {});
  const [empname, setEmpname] = useState(emp && emp.empname ? emp.empname : '');
  const [empnum, setEmpnum] = useState(emp && emp.empnum ? emp.empnum : '');
  const [empsalary, setEmpsalary] = useState(emp && emp.empsalary ? emp.empsalary : '');


  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const body = { empname, empnum, empsalary};
      const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
    
<button
type="button"
class="btn btn-warning"
data-toggle="modal"
data-target={`#id${empnum}`}
>
Edit
</button>

{/* 
id = id10
*/}
<div
class="modal"
id={`id${empnum}`}
onClick={() => setEmpdetails(empdetails)}
>
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title">Edit Todo</h4>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        onClick={() => setEmpdetails(empdetails)}
      >
        &times;
      </button>
    </div>

    <div class="modal-body">
      <input
        type="text"
        className="form-control"
        value={empname}
        placeholder="Enter new empname"
        onChange={(e) => setEmpname(e.target.value)}
      />
    </div>

    <div class="modal-body">
      <input
        type="text"
        className="form-control" placeholder="Enter new empnum"
        value={empnum}
        onChange={(e) => setEmpnum(e.target.value)}
      />
    </div>

    <div class="modal-body">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new empsalary"
        value={empsalary}
        onChange={(e) => setEmpsalary(e.target.value)}
      />
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        onClick={() => handleSubmit(empdetails)}
      >
        Edit
      </button>
      <button
        type="button"
        class="btn btn-danger"
        data-dismiss="modal"
        onClick={() => setEmpdetails(empdetails)}
      >
        Close
      </button>
    </div>
  </div>
</div>
</div>
    </>
  );
};

export default Input;
