// import React, { useState } from 'react';
// import axios from 'axios';
// import { Job } from '../types/Job';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const MatchingJobs: React.FC = () => {
//   const [filters, setFilters] = useState<{ column: string; value: string }[]>(
//     []
//   );
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const handleAddFilter = () => {
//     setFilters([...filters, { column: '', value: '' }]);
//   };

//   const handleFilterChange = (
//     index: number,
//     field: 'column' | 'value',
//     value: string
//   ) => {
//     const newFilters = [...filters];
//     newFilters[index][field] = value;
//     setFilters(newFilters);
//   };

//   const fetchMatchingJobs = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get<any>(`${API_BASE_URL}/jobs/match`, {
//         params: { filters: JSON.stringify(filters) },
//         withCredentials: true, // If your backend requires credentials
//       });
//       setJobs(response.data);
//       console.log(response.data);
//     } catch (error: any) {
//       console.error('Error fetching job data:', error);
//       setError('Failed to fetch jobs. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h1>Find Matching Jobs</h1>
//       <Form>
//         {filters.map((filter, index) => (
//           <Form.Group key={index} className="mb-3">
//             <Form.Label>Filter {index + 1}</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Column"
//               value={filter.column}
//               onChange={(e) =>
//                 handleFilterChange(index, 'column', e.target.value)
//               }
//               className="mb-2"
//             />
//             <Form.Control
//               type="text"
//               placeholder="Value"
//               value={filter.value}
//               onChange={(e) =>
//                 handleFilterChange(index, 'value', e.target.value)
//               }
//             />
//           </Form.Group>
//         ))}
//         <Button variant="secondary" onClick={handleAddFilter} className="mb-3">
//           Add Filter
//         </Button>
//         <Button
//           variant="primary"
//           onClick={fetchMatchingJobs}
//           disabled={loading}
//         >
//           {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
//         </Button>
//       </Form>
//       {error && (
//         <Alert variant="danger" className="mt-3">
//           {error}
//         </Alert>
//       )}
//       <ListGroup className="mt-3">
//         {jobs.map((job) => (
//           <ListGroup.Item key={job.id}>
//             <h5>{job.title}</h5>
//             <p>{job.description}</p>
//             {/* Add other job details here */}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Container>
//   );
// };

// export default MatchingJobs;
