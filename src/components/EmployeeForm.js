import React, { useState } from "react";
import "./EmployeeForm.css"; // keep this if the CSS sits in the same folder
// If your CSS is in src/ (not in components/), use: import "../EmployeeForm.css";

export default function EmployeeForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    department: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();               // stop browser default form submit
    if (onAdd) onAdd(formData);       // send data up to App
    setSubmitted(true);
    setFormData({ name: "", email: "", title: "", department: "" });
  };

  return (
    <section className="emp-section" aria-labelledby="empFormHeading">
      <h1 id="empFormHeading">Add New Employee</h1>

      <form className="emp-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text"
                   value={formData.name} onChange={handleChange}
                   placeholder="e.g., Jordan Parker" required />
          </div>

          <div className="field">
            <label htmlFor="email">Work Email</label>
            <input id="email" name="email" type="email"
                   value={formData.email} onChange={handleChange}
                   placeholder="e.g., jordan.parker@company.com" required />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="title">Job Title</label>
            <input id="title" name="title" type="text"
                   value={formData.title} onChange={handleChange}
                   placeholder="e.g., Systems Analyst" required />
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select id="department" name="department"
                    value={formData.department} onChange={handleChange} required>
              <option value="" disabled>Select a department</option>
              <option>IT</option><option>HR</option><option>Finance</option>
              <option>Operations</option><option>Marketing</option>
            </select>
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary">Add Employee</button>
        </div>

        {submitted && (
          <div className="notice success" role="status" aria-live="polite">
            Employee added successfully.
          </div>
        )}
      </form>
    </section>
  );
}

