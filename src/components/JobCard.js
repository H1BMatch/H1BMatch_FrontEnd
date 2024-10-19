import React from 'react';
import './jobCard.css';
import { Card } from 'react-bootstrap';

const JobCard = ({ job }) => {
    return (
        <Card
        //  style={{ width: '18rem' }}
        >
            <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>
                    {job.description}
                </Card.Text>
                <Card.Link href={job.link}>Job Link</Card.Link>
                <Card.Text>Company: {job.company}</Card.Text>
                <Card.Text>Publication Date: {job.pubDate}</Card.Text>
                <Card.Text>Location: {job.georssPoint}</Card.Text>
                <Card.Text>Company Data: {job.companyData}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default JobCard; 
