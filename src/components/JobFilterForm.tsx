// src/components/JobFilterForm.tsx
// src/components/JobFilterForm.tsx

'use client';

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Filters {
  title: string;
  company: string;
  city: string;
  state: string;
  country: string;
  job_type: string;
  is_remote: boolean;
  date_posted: string;
  min_salary: string;
  max_salary: string;
  job_level: string;
  company_industry: string;
  is_sponsor: boolean;
}

interface JobFilterFormProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: () => void;
  loading: boolean;
}

export function JobFilterForm({ filters, onFilterChange, onSearch, loading }: JobFilterFormProps) {
  const handleInputChange = useCallback(
    (field: keyof Filters, value: any) => {
      onFilterChange({
        ...filters,
        [field]: value,
      });
    },
    [filters, onFilterChange]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch();
    },
    [onSearch]
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Software Engineer"
                value={filters.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g. Google"
                value={filters.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>
            {/* Job Type */}
            <div className="space-y-2">
              <Label htmlFor="job_type">Job Type</Label>
              <Select
                onValueChange={(value) => handleInputChange('job_type', value)}
                value={filters.job_type}
              >
                <SelectTrigger id="job_type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={filters.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={filters.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </div>
            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                value={filters.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </div>
            {/* Date Posted */}
            <div className="space-y-2">
              <Label htmlFor="date_posted">Date Posted (days ago)</Label>
              <Input
                id="date_posted"
                type="number"
                placeholder="e.g. 7"
                value={filters.date_posted}
                onChange={(e) => handleInputChange('date_posted', e.target.value)}
              />
            </div>
            {/* Min Salary */}
            <div className="space-y-2">
              <Label htmlFor="min_salary">Min Salary</Label>
              <Input
                id="min_salary"
                type="number"
                placeholder="Min Salary"
                value={filters.min_salary}
                onChange={(e) => handleInputChange('min_salary', e.target.value)}
              />
            </div>
            {/* Max Salary */}
            <div className="space-y-2">
              <Label htmlFor="max_salary">Max Salary</Label>
              <Input
                id="max_salary"
                type="number"
                placeholder="Max Salary"
                value={filters.max_salary}
                onChange={(e) => handleInputChange('max_salary', e.target.value)}
              />
            </div>
            {/* Job Level */}
            <div className="space-y-2">
              <Label htmlFor="job_level">Job Level</Label>
              <Input
                id="job_level"
                placeholder="e.g. Senior"
                value={filters.job_level}
                onChange={(e) => handleInputChange('job_level', e.target.value)}
              />
            </div>
            {/* Company Industry */}
            <div className="space-y-2">
              <Label htmlFor="company_industry">Company Industry</Label>
              <Input
                id="company_industry"
                placeholder="e.g. Technology"
                value={filters.company_industry}
                onChange={(e) => handleInputChange('company_industry', e.target.value)}
              />
            </div>
          </div>
          {/* Remote & Sponsor Checkboxes */}
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_remote"
                checked={filters.is_remote}
                onCheckedChange={(value) => handleInputChange('is_remote', value as boolean)}
              />
              <Label htmlFor="is_remote">Remote Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_sponsor"
                checked={filters.is_sponsor}
                onCheckedChange={(value) => handleInputChange('is_sponsor', value as boolean)}
              />
              <Label htmlFor="is_sponsor">Companies that Sponsor H1B</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={onSearch} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

// 'use client'

// import React, { useCallback } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Loader2, Search } from 'lucide-react'
// import { Checkbox } from '@/components/ui/checkbox'
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// interface Filters {
//   title: string
//   company: string
//   city: string
//   state: string
//   country: string
//   job_type: string
//   is_remote: boolean
//   date_posted: string
//   min_salary: string
//   max_salary: string
//   job_level: string
//   company_industry: string
//   is_sponsor: boolean
// }

// interface JobFilterFormProps {
//   filters: Filters
//   onFilterChange: (filters: Filters) => void
//   onSearch: () => void
//   loading: boolean
// }

// export default function Component({ filters, onFilterChange, onSearch, loading }: JobFilterFormProps) {
//   const handleInputChange = useCallback(
//     (field: keyof Filters, value: any) => {
//       onFilterChange({
//         ...filters,
//         [field]: value,
//       })
//     },
//     [filters, onFilterChange]
//   )

//   const handleSubmit = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault()
//       onSearch()
//     },
//     [onSearch]
//   )

//   return (
//     <Card className="w-full max-w-4xl">
//       <CardHeader>
//         <CardTitle>Filter Jobs</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Job Title</Label>
//               <Input
//                 id="title"
//                 placeholder="e.g. Software Engineer"
//                 value={filters.title}
//                 onChange={(e) => handleInputChange('title', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="company">Company</Label>
//               <Input
//                 id="company"
//                 placeholder="e.g. Google"
//                 value={filters.company}
//                 onChange={(e) => handleInputChange('company', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="job_type">Job Type</Label>
//               <Select
//                 onValueChange={(value) => handleInputChange('job_type', value)}
//                 value={filters.job_type}
//               >
//                 <SelectTrigger id="job_type">
//                   <SelectValue placeholder="Select job type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Full-time">Full-time</SelectItem>
//                   <SelectItem value="Part-time">Part-time</SelectItem>
//                   <SelectItem value="Contract">Contract</SelectItem>
//                   <SelectItem value="Internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="city">City</Label>
//               <Input
//                 id="city"
//                 placeholder="City"
//                 value={filters.city}
//                 onChange={(e) => handleInputChange('city', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="state">State</Label>
//               <Input
//                 id="state"
//                 placeholder="State"
//                 value={filters.state}
//                 onChange={(e) => handleInputChange('state', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="country">Country</Label>
//               <Input
//                 id="country"
//                 placeholder="Country"
//                 value={filters.country}
//                 onChange={(e) => handleInputChange('country', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="date_posted">Date Posted (days ago)</Label>
//               <Input
//                 id="date_posted"
//                 type="number"
//                 placeholder="e.g. 7"
//                 value={filters.date_posted}
//                 onChange={(e) => handleInputChange('date_posted', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="min_salary">Min Salary</Label>
//               <Input
//                 id="min_salary"
//                 type="number"
//                 placeholder="Min Salary"
//                 value={filters.min_salary}
//                 onChange={(e) => handleInputChange('min_salary', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="max_salary">Max Salary</Label>
//               <Input
//                 id="max_salary"
//                 type="number"
//                 placeholder="Max Salary"
//                 value={filters.max_salary}
//                 onChange={(e) => handleInputChange('max_salary', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="job_level">Job Level</Label>
//               <Input
//                 id="job_level"
//                 placeholder="e.g. Senior"
//                 value={filters.job_level}
//                 onChange={(e) => handleInputChange('job_level', e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="company_industry">Company Industry</Label>
//               <Input
//                 id="company_industry"
//                 placeholder="e.g. Technology"
//                 value={filters.company_industry}
//                 onChange={(e) => handleInputChange('company_industry', e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="is_remote"
//                 checked={filters.is_remote}
//                 onCheckedChange={(value) => handleInputChange('is_remote', value as boolean)}
//               />
//               <Label htmlFor="is_remote">Remote Only</Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="is_sponsor"
//                 checked={filters.is_sponsor}
//                 onCheckedChange={(value) => handleInputChange('is_sponsor', value as boolean)}
//               />
//               <Label htmlFor="is_sponsor">Companies that Sponsor H1B</Label>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Button onClick={onSearch} disabled={loading} className="w-full">
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Searching...
//             </>
//           ) : (
//             <>
//               <Search className="mr-2 h-4 w-4" />
//               Search Jobs
//             </>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }