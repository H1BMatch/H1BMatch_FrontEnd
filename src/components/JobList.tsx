// src/components/JobList.tsx

import React from 'react';
import { Job } from '@/types/Job';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
}

export function JobList({ jobs, loading }: JobListProps) {
  if (loading) {
    return <p className="text-center">Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center">No jobs found. Try adjusting your filters.</p>;
  }

  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
