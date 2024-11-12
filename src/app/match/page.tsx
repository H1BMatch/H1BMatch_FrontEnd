'use client'

import React, { useState, useEffect } from 'react'
import { Job } from '@/types/Job'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from 'date-fns'


const API_BASE_URL = "http://localhost:3001/api"

export default function MatchingJobs() {
  const [filters, setFilters] = useState<{ column: string; value: string }[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchMatchingJobs(); // Automatically fetch jobs on page load
  }, []);

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', value: '' }])
  }

  const handleFilterChange = (
    index: number,
    field: 'column' | 'value',
    value: string
  ) => {
    const newFilters = [...filters]
    newFilters[index][field] = value
    setFilters(newFilters)
  }

  const fetchMatchingJobs = async () => {
    setLoading(true)
    setError('')
    setJobs([])
    setSelectedJob(null)
    try {
      const queryParams = new URLSearchParams({
        filters: JSON.stringify(filterObject),
      })
      const response = await fetch(
        `${API_BASE_URL}/jobs/match?${queryParams}`,
        {
          credentials: 'include',
          credentials: 'include',
        }
      );
      let jobsData = await response.json();
      setJobs(jobsData);
      if (jobsData.length > 0) {
        setSelectedJob(jobsData[0]);
      } else {
        setSelectedJob(null);
      }
    } catch (error: any) {
      console.error('Error fetching job data:', error)
      setError('Failed to fetch jobs. Please try again later.')
    } finally {
      setLoading(false)
    }
  };

  const formatSalary = (min?: number, max?: number, currency?: string, interval?: string) => {
    if (!min && !max) return 'Not specified'
    const formatNumber = (num?: number) => num ? num.toLocaleString() : ''
    const salaryRange = min && max ? `${formatNumber(min)} - ${formatNumber(max)}` : formatNumber(min || max)
    return `${currency || '$'}${salaryRange}${interval ? ` per ${interval}` : ''}`
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-info">Find Matching Jobs</h1>
      <div className="mb-6">
        <form onSubmit={(e) => { e.preventDefault(); fetchMatchingJobs(); }}>
          {filters.map((filter, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Column"
                value={filter.column}
                onChange={(e) =>
                  handleFilterChange(index, 'column', e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Value"
                value={filter.value}
                onChange={(e) =>
                  handleFilterChange(index, 'value', e.target.value)
                }
              />
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={handleAddFilter}>
              Add Filter
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollArea className="h-[calc(100vh)]">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className={`mb-4 cursor-pointer ${selectedJob?.id === job.id ? 'border-primary' : ''}`}
              onClick={() => setSelectedJob(job)}
            >
              <CardHeader>
                <CardTitle className="flex flex-col">
                  <span className="w-full mb-2">{job.title}</span>
                  <div className="flex justify-between items-center">
                    <Badge variant={job.is_remote ? "default" : "secondary"}>
                      {/* job.city is sometime giving us the url to the job, instead of giving us the city name. so used job.state and if it is not Available, then used 'On-site' */}
                      {job.is_remote==true ? "Remote" : job.state || "On-site"}
                    </Badge>
                    <Badge variant={job.is_sponsor ? "default" : "secondary"} className={job.is_sponsor ? "bg-green-500" : ""}>
                      {job.is_sponsor ? "Sponsorship Available" : "No Sponsorship"}
                    </Badge>
                    <Button 
                      variant="link" 
                      className='bg-blue-500 ml-2' 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(job.job_url, '_blank');
                      }}
                    >
                      Apply Job
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-1">{job.company}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {formatSalary(job.min_amount, job.max_amount, job.currency, job.salary_interval)}
                </p>
                <p className="text-sm mb-2">{job.description?.slice(0, 100)}...</p>
                <p className="text-xs text-muted-foreground">
                  Posted {formatDistanceToNow(new Date(job.date_posted))} ago
                </p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        {selectedJob && (
          <div>
            <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
            <p className="text-lg mb-2">{selectedJob.company}</p>
            <div className="flex gap-2 mb-4">
                  <Badge variant={selectedJob.is_remote ? "default" : "secondary"}>
                  {selectedJob.is_remote? "Remote" : selectedJob.city || "On-site"}
                  </Badge>
              <Badge variant="outline">{selectedJob.job_type}</Badge>
              {selectedJob.job_level && <Badge variant="outline">{selectedJob.job_level}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {formatSalary(selectedJob.min_amount, selectedJob.max_amount, selectedJob.currency, selectedJob.salary_interval)}
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="whitespace-pre-line">{selectedJob.description}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Company Information</h3>
              <p>{selectedJob.company_description}</p>
              <p className="mt-2">
                <strong>Industry:</strong> {selectedJob.company_industry || 'Not specified'}
              </p>
              <p>
                <strong>Company Size:</strong> {selectedJob.company_employees_label || 'Not specified'}
              </p>
              <p>
                <strong>Revenue:</strong> {selectedJob.company_revenue_label || 'Not specified'}
              </p>
            </div>
            {selectedJob.ceo_name && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">CEO</h3>
                <p>{selectedJob.ceo_name}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Posted on {new Date(selectedJob.date_posted).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}