import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import Register from './components/register';
import ResetPassword from './components/ResetPassword'; 
import Splash from './components/splash';
import Welcome2 from './components/welcome2';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/swift" element={<Splash />} />
        <Route path="/welcome2" element={<Welcome2 />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/welcome" />}
        />
        <Route path="/reset" element={<ResetPassword />} /> {/* New route */}
        <Route
          path="*"
          element={user ? <MainLayout /> : <Navigate to="/swift" />}
        />
      </Routes>
    </div>
  );
}

function MainLayout() {
  return (
    <>
      <nav className="bg-[var(--primary)] p-4 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/welcome" className="hover:underline" onClick={() => auth.signOut()}>Logout</Link></li>
        </ul>
      </nav>
      <main className="m-0 p-4">
        <Routes>
          <Route index element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;