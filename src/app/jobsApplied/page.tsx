"use client"

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavBar } from '@/components/NavBar'
import { Job } from '@/types/Job'


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const JobsApplied: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAppliedJobs()
  }, [])

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/applied-jobs`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch applied jobs');
      }

      const data = await response.json();
      setAppliedJobs(data);
    } catch (err) {
      console.error('Error fetching applied jobs:', err);
      setError('Failed to load applied jobs. Please try again later.');
    } finally {
      setLoading(false)
    }
  }

  const formatSalary = (min?: number, max?: number, currency?: string, interval?: string) => {
    if (!min && !max) return 'Not specified'
    const formatNumber = (num?: number) => num ? num.toLocaleString() : ''
    const salaryRange = min && max ? `${formatNumber(min)} - ${formatNumber(max)}` : formatNumber(min || max)
    return `${currency || '$'}${salaryRange}${interval ? ` per ${interval}` : ''}`
  }

  
  
  if (loading) {
    return (
      <div className="flex min-h-screen">
        <NavBar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">Loading applied jobs...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <NavBar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <NavBar />
      <div className="ml-64 flex-1 p-8 text-center ">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500 ">Applied Jobs</h1>
        <p className='text-2xl font-bold mb-6 text-center text-green-500'>Total Jobs Applied: {appliedJobs.length} </p>
        <hr />
        {appliedJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-140px)] mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4 bg-white p-4">
              {appliedJobs.slice()
              .reverse()
              .map((job) => (
                <Card 
                  key={job.id} 
                  className="hover:shadow-lg transition-shadow duration-500 shadow-lg rounded-lg "
                >
                  <CardHeader>
                    <div className="flex items-start gap-4 ">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.logo_photo_url} alt={`${job.company} logo`} />
                        <AvatarFallback>
                          <Building className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="flex flex-col flex-1">
                        <p className="w-full mb-2">{job.title}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant={job.is_remote ? "default" : "secondary"}>
                            {job.is_remote ? "Remote" : job.state || "On-site"}
                          </Badge>
                          {/* <button className='border border-blue-400  p-1 rounded'>
                            <a href={job.job_url} className='text-black p-1'>See Job</a>
                          </button> */}
                          <Badge variant={job.is_sponsor ? "default" : "secondary"} className={job.is_sponsor ? "bg-green-500" : ""}>
                            {job.is_sponsor ? "Sponsorship Available" : "No Sponsorship"}
                          </Badge>
                        </div>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold mb-1">{job.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatSalary(job.min_amount, job.max_amount, job.currency, job.salary_interval)}
                    </p>
                    <p className="text-sm mb-2">{job.description?.slice(0, 100)}...</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Posted {formatDistanceToNow(new Date(job.date_posted))} ago
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        Applied on {job.applieddate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

export default JobsApplied;