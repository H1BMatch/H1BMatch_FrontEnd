import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import './App.css';
import axios from 'axios';
import {dummyData} from './data/dummyData';

const App = () => {
  const [jobs, setJobs] = useState(dummyData);
  const fetchJobs = async (title) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/jobs/title/${title}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Errorfetching job data:', error);
    }
    };
    
    return (
    <div className="container mt-5">
    <SearchBar onSearch={fetchJobs} />
    <div className="mt-4">
        <h1> Job Listings </h1>
    {jobs.map((job, index) => (
    <JobCard key={index} job={job} />
    ))}
    </div>
    </div>
    );
    };
    
    export default App;
