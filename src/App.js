import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
  return (
    <BrowserRouter>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}


