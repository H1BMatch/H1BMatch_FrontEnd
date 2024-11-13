"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X } from 'lucide-react'

export default function Component() {
  const [filterObject, setFilterObject] = useState({
    jobType: [],
    underTenApplicants: false,
    datePosted: [],
    experienceLevel: [],
    salary: [],
    company: [],
    remote: [],
    employmentType: [],
    visaSponsorship: [],
  })

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
      underTenApplicants: false,
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

  return (
    <nav className="flex flex-wrap items-center gap-2 p-4 border-b">
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

      <Button
        variant={filterObject.underTenApplicants ? "default" : "outline"}
        className="gap-2"
        onClick={() => updateFilter("underTenApplicants", !filterObject.underTenApplicants)}
      >
        Under 10 applicants
      </Button>

      <Button variant="outline" className="gap-2">
        All filters
        <Badge variant="secondary" className="ml-1">{totalFilters}</Badge>
      </Button>

      <Button variant="ghost" className="gap-2" onClick={resetFilters}>
        Reset
        <X className="h-4 w-4" />
      </Button>
    </nav>
  )
}