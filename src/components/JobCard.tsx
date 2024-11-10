// src/components/JobCard.tsx


import React from 'react';
import { Job } from '@/types/Job';
import { Card, CardContent } from '@/components/ui/card'; // Make sure these are correctly exported from ui/card
import { Badge } from '@/components/ui/badge'; // Ensure Badge is exported correctly from ui/badge
import { Button } from '@/components/ui/button'; // Ensure Button is exported correctly from ui/button
import { Briefcase, MapPin, Building, Calendar, DollarSign, GraduationCap } from 'lucide-react';


interface JobCardProps {
 job?: Job;
}


export function JobCard({ job }: JobCardProps) {
 if (!job) {
   return null;
 }


 const formatSalary = (min?: number, max?: number) => {
   if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
   if (min) return `From $${min.toLocaleString()}`;
   if (max) return `Up to $${max.toLocaleString()}`;
   return 'Salary not specified';
 };


 const formatLocation = (city?: string, state?: string, country?: string) => {
   return [city, state, country].filter(Boolean).join(', ');
 };


 return (
   <Card>
     <CardContent className="p-6">
       <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
         <div>
           <h2 className="text-2xl font-semibold mb-2">{job.title || 'Untitled Position'}</h2>
           <p className="text-muted-foreground mb-2">
             {job.company_url ? (
               <a href={job.company_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                 {job.company || 'Unknown Company'}
               </a>
             ) : (
               job.company || 'Unknown Company'
             )}
           </p>
           <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
             {(job.city || job.state || job.country) && (
               <span className="flex items-center">
                 <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                 {formatLocation(job.city, job.state, job.country)}
               </span>
             )}
             {job.job_type && (
               <span className="flex items-center">
                 <Briefcase className="w-4 h-4 mr-1" aria-hidden="true" />
                 {job.job_type}
               </span>
             )}
             {job.company_industry && (
               <span className="flex items-center">
                 <Building className="w-4 h-4 mr-1" aria-hidden="true" />
                 {job.company_industry}
               </span>
             )}
             {job.job_level && (
               <span className="flex items-center">
                 <GraduationCap className="w-4 h-4 mr-1" aria-hidden="true" />
                 {job.job_level}
               </span>
             )}
           </div>
         </div>
         <div className="flex flex-col items-start sm:items-end gap-2 mt-2 sm:mt-0">
           {job.is_remote !== undefined && (
             <Badge variant={job.is_remote ? 'secondary' : 'outline'}>
               {job.is_remote ? 'Remote' : 'On-site'}
             </Badge>
           )}
           {job.is_sponsor && (
             <Badge variant="outline" className="bg-green-100">
               Visa Sponsor
             </Badge>
           )}
         </div>
       </div>
       {job.description && <p className="mb-4">{job.description}</p>}
       <div className="flex flex-wrap justify-between items-center gap-4">
         <div className="flex flex-wrap items-center gap-4 text-sm">
           <span className="flex items-center">
             <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
             Posted {job.date_posted || 'Recently'}
           </span>
           <span className="flex items-center">
             <DollarSign className="w-4 h-4 mr-1" aria-hidden="true" />
             {formatSalary(job.min_amount, job.max_amount)}
           </span>
         </div>
         <div className="flex gap-2">
           {job.job_url ? (
             <Button asChild>
               <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                 Apply Now
               </a>
             </Button>
           ) : (
             <Button>Apply Now</Button>
           )}
         </div>
       </div>
     </CardContent>
   </Card>
 );
}
