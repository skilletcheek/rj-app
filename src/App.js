// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const LS_KEY = "rj_employees_v1";

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
  const [employees, setEmployees] = useState([]);
  const hasLoaded = useRef(false); // guard: don't save until we've tried to load

  // LOAD once on first render
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    console.log("[LOAD] raw from LS:", raw);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setEmployees(parsed);
      } catch (e) {
        console.warn("[LOAD] parse failed; clearing key", e);
        localStorage.removeItem(LS_KEY);
      }
    }
    hasLoaded.current = true; // now future changes can be saved
  }, []);

  // SAVE only after initial load has run
  useEffect(() => {
    if (!hasLoaded.current) return; // skip the initial empty render
    const raw = JSON.stringify(employees);
    console.log("[SAVE] writing to LS:", raw);
    localStorage.setItem(LS_KEY, raw);
  }, [employees]);

  // add from form
  const handleAddEmployee = (emp) => {
    if (!emp?.name || !emp?.email || !emp?.title || !emp?.department) return;
    setEmployees((list) => [...list, emp]);
  };

  // small inline probe to view JSON quickly
  const Debug = () => (
    <pre style={{ background: "#f9fafb", padding: 12, borderRadius: 8 }}>
      {JSON.stringify({ LS_KEY, employees }, null, 2)}
    </pre>
  );

  return (
    <BrowserRouter>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/employees/new">Add Employee</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/debug">Debug</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/employees/new"
          element={<EmployeeForm onAdd={handleAddEmployee} />}
        />
        <Route
          path="/employees"
          element={<EmployeeList employees={employees} />}
        />
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </BrowserRouter>
  );
}





