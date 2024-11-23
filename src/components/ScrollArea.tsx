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
function ScrollArea({ jobs, setSelectedJob }) {
  return (
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
  );
}
