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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building, ChevronDown, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const API_BASE_URL = "http://localhost:3001/api"

// User profile type
type UserProfile = {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
}

// User Profile Component
const UserProfile: React.FC<{ user: UserProfile }> = ({ user }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>
      <div>
        <h4 className="font-semibold mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

const MatchingJobs: React.FC = () => {
  const [filterObject, setFilterObject] = useState({
    jobType: [],
    datePosted: [],
    experienceLevel: [],
    salary: [],
    company: [],
    remote: [],
    employmentType: [],
    visaSponsorship: [],
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // User profile state (placeholder data)
  const [userProfile] = useState<UserProfile>({
    name: "Bikash Acharya",
    avatar: "https://robohash.org/greenm",
    bio: "Software Development & Data Science Enthusiast | Computer Science & Data Science Graduate NKU (Dec '24)",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"]
  })

  useEffect(() => {
    fetchMatchingJobs()
  }, [])

  const updateFilter = (category, value) => {
    setFilterObject(prev => {
      if (Array.isArray(prev[category])) {
        if (prev[category].includes(value)) {
          return { ...prev, [category]: prev[category].filter(item => item !== value) }
        } else {
          return { ...prev, [category]: [...prev[category], value] }
        }
      } else if (typeof prev[category] === 'boolean') {
        return { ...prev, [category]: !prev[category] }
      } else {
        return { ...prev, [category]: value }
      }
    })
  }

  const resetFilters = () => {
    setFilterObject({
      jobType: [],
      datePosted: [],
      experienceLevel: [],
      salary: [],
      company: [],
      remote: [],
      employmentType: [],
      visaSponsorship: [],
    })
  }

  const totalFilters = Object.entries(filterObject).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return acc + value.length
    } else if (typeof value === 'boolean') {
      return acc + (value ? 1 : 0)
    }
    return acc
  }, 0)

  const filterCategories = [
    { name: "Jobs", key: "jobType", options: ["Engineering", "Design", "Product"] },
    { name: "Date posted", key: "datePosted", options: ["Last 24 hours", "Last 7 days", "Last 30 days", "All time"] },
    { name: "Experience level", key: "experienceLevel", options: ["Entry level", "Mid level", "Senior level", "Director"] },
    { name: "Salary", key: "salary", options: ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"] },
    { name: "Company", key: "company", options: ["Startup", "Mid-size", "Enterprise"] },
    { name: "Remote", key: "remote", options: ["Remote only", "Hybrid", "On-site"] },
    { name: "Employment type", key: "employmentType", options: ["Full-time", "Part-time", "Contract", "Internship"] },
    { name: "Visa Sponsorship", key: "visaSponsorship", options: ["Available", "Not Available"] },
  ]

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
        }
      )
      const jobsData: Job[] = await response.json()
      setJobs(jobsData)
      setSelectedJob(jobsData.length > 0 ? jobsData[0] : null)
    } catch (error: any) {
      console.error('Error fetching job data:', error)
      setError('Failed to fetch jobs. Please try again later.')
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-info">Find Matching Jobs</h1>
      <div className="flex gap-6">
        <div className="w-1/4">
          <UserProfile user={userProfile} />
        </div>
        <div className="w-3/4">
          <nav className="flex flex-wrap items-center gap-2 p-4 border-b mb-6">
            {filterCategories.map((category) => (
              <DropdownMenu key={category.key}>
                <DropdownMenuTrigger asChild>
                  <Button variant={filterObject[category.key].length > 0 ? "default" : "outline"} className="gap-2">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by {category.name.toLowerCase()}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {category.options.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option}
                        checked={filterObject[category.key].includes(option)}
                        onCheckedChange={() => updateFilter(category.key, option)}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Button variant="outline" className="gap-2">
              All filters
              <Badge variant="secondary" className="ml-1">{totalFilters}</Badge>
            </Button>
            <Button variant="ghost" className="gap-2" onClick={resetFilters}>
              Reset
              <X className="h-4 w-4" />
            </Button>
            <Button variant="default" className="gap-2" onClick={fetchMatchingJobs}>
              Search
            </Button>
          </nav>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
            <ScrollArea className="h-full pr-4">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="mb-4 cursor-pointer hover:border-primary"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.logo_photo_url} alt={`${job.company} logo`} />
                        <AvatarFallback>
                          <Building className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="flex flex-col flex-1">
                        <span className="w-full mb-2">{job.title}</span>
                        <div className="flex justify-between items-center">
                          <Badge variant={job.is_remote ? "default" : "secondary"}>
                            {job.is_remote ? "Remote" : job.state || "On-site"}
                          </Badge>
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
                    <p className="text-xs text-muted-foreground">
                      Posted {formatDistanceToNow(new Date(job.date_posted))} ago
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
            {selectedJob && (
              <ScrollArea className="h-full pl-4">
                <div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedJob.logo_photo_url} alt={`${selectedJob.company} logo`} />
                    <AvatarFallback>
                      <Building className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
                  <p className="text-lg mb-2">{selectedJob.company}</p>
                </div>
                <div className="flex gap-2 mb-4">
                  <Badge variant={selectedJob.is_remote ? "default" : "secondary"}>
                    {selectedJob.is_remote ? "Remote" : selectedJob.state || "On-site"}
                  </Badge>
                  {selectedJob.job_type && <Badge variant="outline">{selectedJob.job_type}</Badge>}       
                  {selectedJob.job_level && <Badge variant="outline">{selectedJob.job_level}</Badge>}
                  <Button
                    className="bg-blue-500 ml-2" 
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(selectedJob.job_url, '_blank')
                    }}
                  >
                    Apply Job
                  </Button>
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
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchingJobs