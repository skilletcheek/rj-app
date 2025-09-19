// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditEmployeeForm from "./components/EditEmployeeForm";

const LS_KEY = "rj_employees_v1";
const genId = () => crypto.randomUUID?.() || String(Date.now() + Math.random());

function Home() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Home</h1>
      <p>Welcome to rj-app!</p>
    </main>
  );
}

function About() {
  return (
    <main style={{ padding: 16 }}>
      <h1>About</h1>
      <p>About this app.</p>
    </main>
  );
}

export default function App() {
  // Lazy init: read LS once
  const [employees, setEmployees] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      // Back-compat: add ids if missing
      if (Array.isArray(parsed)) {
        return parsed.map((e) => (e.id ? e : { ...e, id: genId() }));
      }
      return [];
    } catch {
      return [];
    }
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(employees));
  }, [employees]);

  // ADD (from /employees/new)
  const handleAddEmployee = (emp) => {
    if (!emp?.name || !emp?.email || !emp?.title || !emp?.department) return;
    setEmployees((prev) => [...prev, { ...emp, id: genId() }]);
  };

  // UPDATE (from /employees/edit/:id)
  const handleUpdateEmployee = (updated) => {
    setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  // DELETE (from list)
  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <BrowserRouter>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/employees/new">Add Employee</Link>
          <Link to="/employees">Employees</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/employees"
          element={
            <EmployeeList
              employees={employees}
              onDelete={handleDeleteEmployee}
            />
          }
        />

        <Route
          path="/employees/new"
          element={<EmployeeForm onAdd={handleAddEmployee} />}
        />

        <Route
          path="/employees/edit/:id"
          element={
            <EditEmployeeForm
              employees={employees}
              onUpdate={handleUpdateEmployee}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}





