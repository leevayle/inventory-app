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
      <main className="p-4">
        <Routes>
          <Route index element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;