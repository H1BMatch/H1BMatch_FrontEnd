// src/components/JobCard.tsx

import React from 'react';
import './JobCard.css';
import { Job } from '../types/Job';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="m-3 bg-light p-2 ">
      <Card.Body>
        <Card.Title>{job.title} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
        <Card.Text>{job.description}</Card.Text>
        <Card.Text>
          <strong>Location:</strong> {job.city}, {job.state}
        </Card.Text>
        <Card.Text>
          <strong>Publication Date:</strong>{' '}
          {new Date(job.date_posted).toLocaleDateString()}
        </Card.Text>
        {job.is_remote && (
          <Card.Text>
            <strong>Remote:</strong> Yes
          </Card.Text>
        )}
        <Button variant="primary" href={job.job_url} target="_blank">
          View Job
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
