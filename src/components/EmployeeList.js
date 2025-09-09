// src/components/EmployeeList.js
import React from "react";

export default function EmployeeList({ employees }) {
  if (!employees.length) {
    return <p style={{ padding: 16 }}>No employees yet. Add one above.</p>;
  }

  return (
    <section style={{ padding: 16 }}>
      <h2>Saved Employees</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Title</th>
              <th style={th}>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <tr key={i}>
                <td style={td}>{e.name}</td>
                <td style={td}>{e.email}</td>
                <td style={td}>{e.title}</td>
                <td style={td}>{e.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
  padding: "8px 6px",
  fontWeight: 600
};
const td = {
  borderBottom: "1px solid #f1f5f9",
  padding: "8px 6px"
};
