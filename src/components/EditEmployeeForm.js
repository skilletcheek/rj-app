// src/components/EditEmployeeForm.js
import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditEmployeeForm({ employees, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const current = useMemo(
    () => employees.find((e) => e.id === id),
    [employees, id]
  );

  const [formData, setFormData] = useState(() => ({
    id: current?.id || "",
    name: current?.name || "",
    email: current?.email || "",
    title: current?.title || "",
    department: current?.department || "",
  }));

  if (!current) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Employee Not Found</h1>
        <p>The employee you’re trying to edit does not exist.</p>
        <Link to="/employees">Back to list</Link>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate?.(formData);
    navigate("/employees");
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Full Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Work Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Job Title
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Department
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="" disabled>Select a department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>Marketing</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={primaryBtn}>Save Changes</button>
          <Link to="/employees" style={linkBtn}>Cancel</Link>
        </div>
      </form>
    </main>
  );
}

const formStyle = { display: "grid", gap: 12, maxWidth: 520 };
const labelStyle = { display: "grid", gap: 6, fontWeight: 600 };
const inputStyle = { padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8 };
const primaryBtn = { padding: "10px 14px", borderRadius: 8, border: "1px solid #2563eb", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" };
const linkBtn = { padding: "10px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", color: "#111827", textDecoration: "none", fontWeight: 600 };
