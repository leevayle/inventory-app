import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome.jsx';
import ResetPassword from './components/ResetPassword'; 
import Splash from './components/splash';
import Start from './components/start.jsx';
import Phone from './components/Phone.jsx';
import Email from './components/Email.jsx';
import Almost from './components/Almost.jsx';
import Finish from './components/Finish.jsx';
import Trust from './components/Trust.jsx';
import Pin from './components/Pin.jsx';
import Sell from './components/sell.jsx';


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
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Getting_started" element={<Splash />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/Phone" element={<Phone />} />
        <Route path='/Email' element={<Email />} />
        <Route path='/Almost' element={<Almost />} />
        <Route path='/Finish' element={<Finish />} />
        <Route path='/Trust' element={<Trust />} />
        <Route path='/Quick-Login' element={<Pin />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Sell' element={<Sell />} />


        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/Welcome" />}
        />
        <Route path="/reset" element={<ResetPassword />} /> {/* New route */}
        <Route
          path="*"
          element={user ? <MainLayout /> : <Navigate to="/Getting_started" />}
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