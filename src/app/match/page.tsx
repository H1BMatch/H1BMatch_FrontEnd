'use client';
import React, { useState } from 'react';
import { Job } from '@/types/Job';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@nextui-org/spinner';
import { ListGroup } from 'react-bootstrap';
import JobCard from '@/components/JobCard';

// const API_BASE_URL = process.env.NEXT_API_BASE_URL;
const API_BASE_URL = "http://localhost:3001/api";
// const API_BASE_URL = 'localhost...';
console.log(API_BASE_URL);

const MatchingJobs: React.FC = () => {
  const [filters, setFilters] = useState<{ column: string; value: string }[]>(
    []
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', value: '' }]);
  };

  const handleFilterChange = (
    index: number,
    field: 'column' | 'value',
    value: string
  ) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  const fetchMatchingJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams({
        filters: JSON.stringify(filters),
      });

      const response = await fetch(
        `${API_BASE_URL}/jobs/match?${queryParams}`,
        {
          credentials: 'include', // Use 'include' if the backend requires credentials like cookies
        }
      );
      let jobsData =  await response.json();
      setJobs(jobsData);
    } catch (error: any) {
      console.error('Error fetching job data:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5">
      <h1>Find Matching Jobs</h1>
      <form>
        {filters.map((filter, index) => (
          <div key={index} className="mb-3">
            <label>Filter {index + 1}</label>
            {/* <Form.Control
              type="text"
              placeholder="Column"
              value={filter.column}
              onChange={(e) =>
                handleFilterChange(index, 'column', e.target.value)
              }
              className="mb-2"
            />
            <Form.Control
              type="text"
              placeholder="Value"
              value={filter.value}
              onChange={(e) =>
                handleFilterChange(index, 'value', e.target.value)
              }
            /> */}
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddFilter} className="mb-3">
          Add Filter
        </Button>
        <Button
          variant="default"
          onClick={fetchMatchingJobs}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : 'Search'}
        </Button>
      </form>
      {error && (
        <Alert variant={'destructive'} className="mt-3">
          {error}
        </Alert>
      )}
      <ListGroup className="mt-3 p-3 bg-green">
        {jobs.map((job) => {
          return (
            <JobCard key={job.id} job={job} />
          );
        })}
      </ListGroup>
    </section>
  );
};
{
  /* Add other job details here */
}

export default MatchingJobs;
