// src/components/EmployeeList.js
import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeList.css";

export default function EmployeeList({ employees, onDelete }) {
  return (
    <main className="employee-list">
      <h1>Employee List</h1>

      {employees.length === 0 ? (
        <div className="empty">
          <p>No employees yet.</p>
          <Link to="/employees/new" className="btn-primary">Add Employee</Link>
        </div>
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.title}</td>
                    <td>{e.department}</td>
                    <td className="actions">
                      <Link to={`/employees/edit/${e.id}`} className="btn-link">Edit</Link>
                      <button
                        className="btn-danger"
                        onClick={() => onDelete?.(e.id)}
                        aria-label={`Delete ${e.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="footer-actions">
            <Link to="/employees/new" className="btn-primary">Add Employee</Link>
          </div>
        </>
      )}
    </main>
  );
}

