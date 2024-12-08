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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NavBar } from '@/components/NavBar'
import { get } from 'http'

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
          <h4 className="text-sm text-muted-foreground mb-4 mt-1"> {user.title}</h4>
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
    jobType: string[];
    datePosted: string[];
    experienceLevel: string[];
    salary: string[];
    company: string[];
    remote: string[];
    employmentType: string[];
    visaSponsorship: string[];
  }>({
    jobType: [],
    datePosted: [],
    experienceLevel: [],
    salary: [],
    company: [],
    remote: [],
    employmentType: [],
    visaSponsorship: [],
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
    try{
      const response = await fetch(`${API_BASE_URL}/user`, {
        credentials: 'include',
       });
    }
    catch(error) {
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
      setAppliedJobs(data);
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

  const updateFilter = (category: keyof typeof filterObject, value: string) => {
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

  const filterCategories: { name: string; key: keyof typeof filterObject; options: string[] }[] = [
    { name: "Jobs", key: "jobType", options: ["Software Engineer", "Data Scientist", "Web Developer","Data Engineer", "Front End", "Backend"] },
    { name: "Date posted in days", key: "datePosted", options: ["1", "2", "7", "30", "All Day"] },
    { name: "Experience level", key: "experienceLevel", options: ["Entry level", "Mid level", "Senior level", "Director"] },
    { name: "Min Salary", key: "salary", options: ["10000", "40000", "60000", "80000", "100000","100000+"] },
    { name: "Company", key: "company", options: ["Startup", "Mid-size", "Enterprise"] },
    { name: "Remote", key: "remote", options: ["Remote only", "Hybrid", "On-site"] },
    { name: "Employment type", key: "employmentType", options: ["Full-time", "Part-time", "Contract", "Internship"] },
    { name: "Visa Sponsorship", key: "visaSponsorship", options: ["Available", "Not Available"] },
  ]

  const fetchMatchingJobs = async () => {
    console.log("Inside the fetching jobs function");
    setLoading(true)
    setError('')
    setJobs([])
    setSelectedJob(null)
    try {
      const queryParams = new URLSearchParams();
      // Dynamically add filters to the query parameters
      if (filterObject.jobType && filterObject.jobType.length > 0) {
        queryParams.append('job_type', filterObject.jobType.join(',')); // Assuming it's an array
      }
      if (filterObject.datePosted && filterObject.datePosted.length > 0) {
        queryParams.append('date_posted', filterObject.datePosted.join(','));
      }
      if (filterObject.experienceLevel && filterObject.experienceLevel.length > 0) {
        queryParams.append('job_level', filterObject.experienceLevel.join(','));
      }
      if (filterObject.salary && filterObject.salary.length > 0) {
        queryParams.append('min_salary', filterObject.salary[0]);
        queryParams.append('max_salary', filterObject.salary[1]);
      }
      if (filterObject.company && filterObject.company.length > 0) {
        queryParams.append('company', filterObject.company.join(','));
      }
      if (filterObject.remote && filterObject.remote.length > 0) {
        queryParams.append('is_remote', filterObject.remote.includes('Remote only').toString());
      }
      if (filterObject.employmentType && filterObject.employmentType.length > 0) {
        queryParams.append('job_type', filterObject.employmentType.join(',')); // Adjust if already included in jobType
      }
      if (filterObject.visaSponsorship && filterObject.visaSponsorship.length > 0) {
        queryParams.append('is_sponsor', filterObject.visaSponsorship.includes('Available').toString());
      }

      console.log('queryParams:', queryParams.toString());
      const response = await fetch(
        `${API_BASE_URL}/jobs/match?${queryParams.toString()}`,
        {
          credentials: 'include',
        }
      )
      console.log('filterObject:', JSON.stringify(filterObject)); 
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

  const handleApplyClick = (job: Job) => {
    // Open the job link in a new tab
    window.open(job.job_url, '_blank');
    
    // Set the job to apply and a flag to show the dialog when the user returns
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
          const response =  await fetch(`${API_BASE_URL}/applied-jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobToApply.id, appliedDate: currentDate }),
            credentials: 'include',
          });
          if (!response.ok) {
            alert('Error applying to job. Please try again later.');
            console.error('Error adding this job to applied jobs section:', response.statusText);
          }
         else  {
          console.log('Job applied successfully');  

         }
        }
        catch (error) {
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

