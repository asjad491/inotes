import './index.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './ProtectedRoute'; // ✅ Import Protected Route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const routes = (
  <Router>
    <Routes>
      {/* ✅ Protect /dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

function App() {
  return (
    <>
      <div>{routes}</div>
    </>
  );
}

export default App;
