'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NavBar } from '@/components/NavBar'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// User profile type
type UserProfile = {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  title: string;
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
          <h4 className="text-sm text-muted-foreground mb-4 mt-1">{user.title}</h4>
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
  const [filterObject, setFilterObject] = useState<{
    title: string;
    is_remote?: boolean;
    job_type: string;
  }>({
    title: '',
    job_type: '',
  });
  
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    avatar: "",
    bio: "",
    skills: [],
    title: "",
  })

  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set())
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [jobToApply, setJobToApply] = useState<Job | null>(null)
  const [applicationDates, setApplicationDates] = useState<{ [key: string]: Date }>({});

  const getUserRoute = async () => { 
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        credentials: 'include',
      });
    } catch(error) {
      console.log("Error fetching user route:", error);
    }
  }

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Error fetching user data");
      } 
      const data = await response.json();
      setUserProfile({
        name: data.name
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' '),
        avatar: data.profile_picture_link,
        bio: data.bio || "Please Update your bio on the profile page",
        skills: data.skills || ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
        title: data.title || "Software Engineer",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/applied-jobs`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch applied jobs');
      }

      const data = await response.json();
      setAppliedJobs(new Set(data));
    } catch (err) {
      console.error('Error fetching applied jobs:', err);
      setError('Failed to load applied jobs. Please try again later.');
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserRoute();
    getUserProfile();
    fetchAppliedJobs();
    fetchMatchingJobs();
  }, [])

  useEffect(() => {
    const handleFocus = () => {
      if (localStorage.getItem('showApplyDialog') === 'true') {
        setIsApplyDialogOpen(true);
        localStorage.removeItem('showApplyDialog');
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const updateFilter = (category: keyof typeof filterObject, value: string | boolean) => {
    setFilterObject(prev => {
      if (Array.isArray(prev[category])) {
        const array = prev[category] as string[];
        if (array.includes(value as string)) {
          return { ...prev, [category]: array.filter(item => item !== value) };
        } else {
          return { ...prev, [category]: [...array, value as string] };
        }
      } else if (typeof prev[category] === 'boolean') {
        return { ...prev, [category]: value as boolean };
      } else {
        return { ...prev, [category]: value as string };
      }
    });
  };

  const resetFilters = () => {
    setFilterObject({
      title: '',
      is_remote: undefined,
      job_type: '',
    });
  };

  const filterCategories = [
    { name: "Job Title", key: "title" as const },
    { name: "Remote", key: "is_remote" as const },
    { name: "Job Type", key: "job_type" as const, options: ["temporary", "fulltime", "contract", "internship", "parttime"] },
  ];

  const fetchMatchingJobs = async () => {
    console.log("Inside the fetching jobs function");
    setLoading(true)
    setError('')
    setJobs([])
    setSelectedJob(null)
    try {
      const queryParams = new URLSearchParams();
    
      if (filterObject.title) {
        queryParams.append('title', filterObject.title);
      }
      if (filterObject.is_remote !== undefined) {
        queryParams.append('is_remote', filterObject.is_remote.toString());
      }
      if (filterObject.job_type) {
        queryParams.append('job_type', filterObject.job_type);
      }

      console.log('queryParams:', queryParams.toString());
      const response = await fetch(
        `${API_BASE_URL}/jobs/match${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
        {
          credentials: 'include',
        }
      )

      const jobsData: Job[] = await response.json()
      console.log('jobsData:', jobsData)
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

  const handleApplyClick = (job: Job) => {
    window.open(job.job_url, '_blank');
    setJobToApply(job);
    localStorage.setItem('showApplyDialog', 'true');
  };

  const handleApplyConfirm = async (applied: boolean) => {
    if (jobToApply) {
      if (applied) {
        const newAppliedJobs = new Set(appliedJobs).add(jobToApply.id);
        setAppliedJobs(newAppliedJobs);
        const currentDate = new Date();
        setApplicationDates(prev => ({ ...prev, [jobToApply.id]: currentDate }));
        try {
          const response = await fetch(`${API_BASE_URL}/applied-jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobToApply.id, appliedDate: currentDate }),
            credentials: 'include',
          });
          if (!response.ok) {
            alert('Error applying to job. Please try again later.');
            console.error('Error adding this job to applied jobs section:', response.statusText);
          } else {
            console.log('Job applied successfully');  
          }
        } catch (error) {
          console.error('Error applying to job:', error);
        }
      }
      setIsApplyDialogOpen(false);
      setJobToApply(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <NavBar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">Loading Matched jobs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <NavBar />
      <div className="ml-64 flex-1 p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Find Matching Jobs</h1>
        <hr />
        <div className="flex gap-6 mt-1">
          <div className="w-1/4">
            <UserProfile user={userProfile} />
          </div>
          <div className="w-3/4">
            <nav className="flex flex-wrap items-center gap-4 p-4 border-b mb-6">
              <div className="flex items-center gap-2">
                <label htmlFor="jobTitle" className="font-medium">Job Title:</label>
                <Input
                  id="jobTitle"
                  type="text"
                  placeholder="Enter job title"
                  value={filterObject.title}
                  onChange={(e) => setFilterObject(prev => ({ ...prev, title: e.target.value }))}
                  className="w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="isRemote" className="font-medium">Remote:</label>
                <input
                  id="isRemote"
                  type="checkbox"
                  checked={filterObject.is_remote || false}
                  onChange={(e) => setFilterObject(prev => ({ ...prev, is_remote: e.target.checked }))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="font-medium">Job Type:</span>
                {filterCategories.find(cat => cat.key === "job_type")?.options?.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jobType"
                      value={option}
                      checked={filterObject.job_type === option}
                      onChange={() => setFilterObject(prev => ({ ...prev, job_type: option }))}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="default" className="gap-2 bg-blue-500" onClick={fetchMatchingJobs}>
                  Search
                </Button>
                <Button variant="outline" className="gap-2" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
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
                            <Badge variant={job.is_remote ? "default" : "secondary"} className={job.is_remote ? "bg-green-500" : ""}>
                              {job.is_remote ? "Remote" : job.state || "On-site"}
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
                        {appliedJobs.has(job.id) && (
                          <p className="text-xs text-green-600 font-semibold">
                            Applied on {applicationDates[job.id]?.toLocaleDateString()}
                          </p>
                        )}
                      </div>
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
                        e.stopPropagation();
                        handleApplyClick(selectedJob);
                      }}
                    >
                      {appliedJobs.has(selectedJob.id) 
                        ? `Applied on ${applicationDates[selectedJob.id]?.toLocaleDateString()}` 
                        : "Apply Job"}
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
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Did you apply to this job?</DialogTitle>
            <DialogDescription>
              Confirm if you've applied to {jobToApply?.title} at {jobToApply?.company}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => handleApplyConfirm(false)}>No</Button>
            <Button onClick={() => handleApplyConfirm(true)}>Yes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MatchingJobs;

