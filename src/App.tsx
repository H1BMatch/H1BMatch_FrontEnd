import React from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import the components for the 
import { SignIn } from '@clerk/clerk-react';
import MatchingJobs from '../src/app/match/page';
import LandingPage from '@/components/LandingPage';
import JobsApplied from '../src/app/jobsApplied/page';
import ProfilePage from '../src/app/profile/page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={
          <div className='h-screen grid place-items-center'><SignIn /> </div> } />
        
        {/* Protect the /match route so only signed-in users can access it */}
        <Route path="/match" element={
          <ProtectedRoute>
            <MatchingJobs />
          </ProtectedRoute>
        } />
        <Route path="/jobsApplied" element={
          <ProtectedRoute>
            <JobsApplied />
          </ProtectedRoute>
        } />
        <Route path="/match" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
