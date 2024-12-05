"use client"

import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { NavBar } from '@/components/NavBar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building } from 'lucide-react'
import { Job } from '@/types/Job'
// Dummy data for jobs applied with expanded properties
const initialJobs: Job[] = [
  {
    id: '1',
    title: "Frontend Developer",
    company: "TechCorp",
    appliedDate: new Date(2023, 5, 15),
    logo_photo_url: "/placeholder.svg?height=40&width=40",
    is_remote: true,
    state: "California",
    is_sponsor: true,
    min_amount: 80000,
    max_amount: 120000,
    currency: "$",
    salary_interval: "year",
    description: "Frontend Developer position focused on building responsive web applications using React and Next.js. Experience with modern JavaScript frameworks required."
  },
  {
    id: '2',
    title: "Full Stack Engineer",
    company: "WebSolutions",
    appliedDate: new Date(2023, 5, 18),
    logo_photo_url: "/placeholder.svg?height=40&width=40",
    is_remote: false,
    state: "New York",
    is_sponsor: false,
    min_amount: 100000,
    max_amount: 150000,
    currency: "$",
    salary_interval: "year",
    description: "Full Stack Engineer position working with React, Node.js, and AWS. Must have experience with cloud infrastructure and microservices architecture."
  },
  {
    id: '2',
    title: "Full Stack Engineer",
    company: "WebSolutions",
    appliedDate: new Date(2023, 5, 18),
    logo_photo_url: "/placeholder.svg?height=40&width=40",
    is_remote: false,
    state: "New York",
    is_sponsor: false,
    min_amount: 100000,
    max_amount: 150000,
    currency: "$",
    salary_interval: "year",
    description: "Full Stack Engineer position working with React, Node.js, and AWS. Must have experience with cloud infrastructure and microservices architecture."
  },
    {
        id: '2',
        title: "Full Stack Engineer",
        company: "WebSolutions",
        appliedDate: new Date(2023, 5, 18),
        logo_photo_url: "/placeholder.svg?height=40&width=40",
        is_remote: false,
        state: "New York",
        is_sponsor: false,
        min_amount: 100000,
        max_amount: 150000,
        currency: "$",
        salary_interval: "year",
        description: "Full Stack Engineer position working with React, Node.js, and AWS. Must have experience with cloud infrastructure and microservices architecture."
    },
    {
        id: '2',
        title: "Full Stack Engineer",
        company: "WebSolutions",
        appliedDate: new Date(2023, 5, 18),
        logo_photo_url: "/placeholder.svg?height=40&width=40",
        is_remote: false,
        state: "New York",
        is_sponsor: false,
        min_amount: 100000,
        max_amount: 150000,
        currency: "$",
        salary_interval: "year",
        description: "Full Stack Engineer position working with React, Node.js, and AWS. Must have experience with cloud infrastructure and microservices architecture."
    },
    {
        id: '2',
        title: "Full Stack Engineer",
        company: "WebSolutions",
        appliedDate: new Date(2023, 5, 18),
        logo_photo_url: "/placeholder.svg?height=40&width=40",
        is_remote: false,
        state: "New York",
        is_sponsor: false,
        min_amount: 100000,
        max_amount: 150000,
        currency: "$",
        salary_interval: "year",
        description: "Full Stack Engineer position working with React, Node.js, and AWS. Must have experience with cloud infrastructure and microservices architecture."
    },
    {
        id: '2',
        title: "Full Stack Engineer",
        company: "WebSolutions",
        appliedDate: new Date(2023, 5, 18),
        logo_photo_url: "/placeholder.svg?height=40&width=40",
        is_remote: false,
        state: "New York",
        is_sponsor: false,
        min_amount: 100000,
        max_amount: 150000}
]

export default function JobsApplied() {
  const [jobs, setJobs] = useState(initialJobs)
  const [selectedJob, setSelectedJob] = useState(null)

  const formatSalary = (min?: number, max?: number, currency?: string, interval?: string) => {
    if (!min && !max) return 'Not specified'
    const formatNumber = (num?: number) => num ? num.toLocaleString() : ''
    const salaryRange = min && max ? `${formatNumber(min)} - ${formatNumber(max)}` : formatNumber(min || max)
    return `${currency || '$'}${salaryRange}${interval ? ` per ${interval}` : ''}`
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />
      <div className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-bold mb-6">Jobs Applied</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-primary"
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
                <Badge variant="outline" className="text-xs">
                  Applied on {format(job.appliedDate, 'MMM d, yyyy')}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

