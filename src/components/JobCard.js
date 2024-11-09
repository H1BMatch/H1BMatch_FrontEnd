// import React from 'react';
// import './jobCard.css';
// import { Card } from 'react-bootstrap';

const JobCard = ({ job }) => {
    return (
        <Card className='mb-2 p-1 dark shadow-lg rounded'
         style={{ width: '18rem', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}  
        >
            <Card.Body>
                <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{job.title}</Card.Title>
                <Card.Text style={{ fontSize: '1rem', color: '#6c757d' }}>
                    {job.description}
                </Card.Text>
                <Card.Link href={job.link} style={{ color: '#007bff' }}>Job Link</Card.Link>
                <Card.Text style={{ fontSize: '0.875rem', color: '#6c757d' }}>Company: {job.company}</Card.Text>
                <Card.Text style={{ fontSize: '0.875rem', color: '#6c757d' }}>Publication Date: {job.pubDate}</Card.Text>
                <Card.Text style={{ fontSize: '0.875rem', color: '#6c757d' }}>Location: {job.georssPoint}</Card.Text>
                <Card.Text style={{ fontSize: '0.875rem', color: '#6c757d' }}>Company Data: {job.companyData}</Card.Text>
            </Card.Body>
        </Card>
    );
};

// export default JobCard; 
