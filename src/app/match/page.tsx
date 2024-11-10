
// src/app/matchingJobs.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Job } from '@/types/Job';
import JobFilterForm from '@/components/JobFilterForm';
import { Alert, AlertDescription } from '@/components/ui/alert';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

interface Filters {
  title: string;
  company: string;
  city: string;
  state: string;
  country: string;
  job_type: string;
  is_remote: boolean;
  date_posted: string; // days ago
  min_salary: string;
  max_salary: string;
  job_level: string;
  company_industry: string;
  is_sponsor: boolean;
}

export default function MatchingJobs() {
  const [filters, setFilters] = useState<Filters>({
    title: '',
    company: '',
    city: '',
    state: '',
    country: '',
    job_type: '',
    is_remote: false,
    date_posted: '',
    min_salary: '',
    max_salary: '',
    job_level: '',
    company_industry: '',
    is_sponsor: false,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const fetchMatchingJobs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
      const response = await fetch(
        `${API_BASE_URL}/jobs/match?${queryParams}`,
        {
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching job data:', error);
      setError(
        'Failed to fetch jobs. Please check your network connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return (
    <section className="mt-5 space-y-6">
      <h1 className="text-2xl font-bold">Find Matching Jobs</h1>
      <JobFilterForm
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={fetchMatchingJobs}
        loading={loading}
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <JobList jobs={jobs} />
    </section>
  );
}

function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return <p>No jobs found. Try adjusting your filters.</p>;
  }

  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <li key={job.id} className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="mt-2">{job.description}</p>
          {/* Add other job details here */}
        </li>
      ))}
    </ul>
  );
}

