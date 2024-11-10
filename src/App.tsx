import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
// import MatchingJobs from './components/MatchingJobs';
import LandingPage from '@/components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={
          <div className='h-screen grid place-items-center'><SignIn /> </div> } />
      </Routes>
    </Router>
  );
};

export default App;
