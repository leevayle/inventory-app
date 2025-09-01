import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="h-screen bg-gray-100 w-screen flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Welcome" element={<Welcome />} />
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
      <main className="m-0">
        <Routes>
          <Route index element={<Welcome />} />
        </Routes>
        
      </main>
    </>
  );
}

export default App;