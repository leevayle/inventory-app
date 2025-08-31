import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

function MainLayout() {
  return (
    <>
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/login" className="hover:underline">Logout</Link></li>
        </ul>
      </nav>
      <main className="p-4">
        <Routes>
          <Route index element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;