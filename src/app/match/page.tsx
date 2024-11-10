'use client'

import React, { useState, useCallback } from 'react'
import { Job } from '@/types/Job'
import {JobFilterForm} from '@/components/JobFilterForm'
import {JobList} from '@/components/JobList'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

interface Filters {
  title: string
  company: string
  city: string
  state: string
  country: string
  job_type: string
  is_remote: boolean
  date_posted: string
  min_salary: string
  max_salary: string
  job_level: string
  company_industry: string
  is_sponsor: boolean
}

export default function MatchingJobs() {
  const [filters, setFilters] = useState<Filters>({
    title: '',
    company: '',
    city: '',
    state: '',
    country: '',
    job_type: '',
    is_remote: false,
    date_posted: '',
    min_salary: '',
    max_salary: '',
    job_level: '',
    company_industry: '',
    is_sponsor: false,
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
  }, [])

const fetchMatchingJobs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
      const response = await fetch(`${API_BASE_URL}/jobs/match?${queryParams}`, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching job data:', error)
      setError('Failed to fetch jobs. Please check your network connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Matching Jobs</h1>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <JobFilterForm
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={fetchMatchingJobs}
                loading={loading}
              />
            </CardContent>
          </Card>
        </aside>
        <main>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <JobList jobs={jobs} loading={loading} />
        </main>
      </div>
    </div>
    )
  }
