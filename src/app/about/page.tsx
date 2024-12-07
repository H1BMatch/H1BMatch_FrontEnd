"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NavBar } from "@/components/NavBar";
interface DeveloperCardProps {
  name: string
  role: string
  email: string
  photo: string
  description: string
}

function DeveloperCard({ name, role, email, photo, description }: DeveloperCardProps) {
  return (
    <Card>
      <CardContent className="mx-4 p-4 flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-3">
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{role}</p>
        <a href={`mailto:${email}`} className="text-sm text-blue-600 hover:underline mb-4">
          {email}
        </a>
        <p className="text-xs">{description}</p>
      </CardContent>
    </Card>
  )
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/myzyyqaj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("Thanks for your submission!")
        form.reset()
      } else {
        const data = await response.json()
        if (Object.hasOwn(data, "errors")) {
          setSubmitStatus(data["errors"].map((error: { message: string }) => error["message"]).join(", "))
        } else {
          setSubmitStatus("Oops! There was a problem submitting your form")
        }
      }
    } catch (error) {
      setSubmitStatus("Oops! There was a problem submitting your form")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input type="text" name="name" placeholder="Your Name" required className="w-full" />
      </div>
      <div>
        <Input type="email" name="email" placeholder="Your Email" required className="w-full" />
      </div>
      <div>
        <Textarea name="message" placeholder="Your Message" required className="w-full min-h-[150px]" />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      {submitStatus && (
        <div className={`mt-4 p-4 ${submitStatus.includes("Oops") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded-md`} role="alert">
          {submitStatus}
        </div>
      )}
    </form>
  )
}

export default function AboutUsPage() {
  const developers = [
    {
      name: "Bikash Acharya",
      role: "Full Stack Engineer",
      email: "sebikash10@gmail.com",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHmJozR8AMzJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666404518370?e=1738800000&v=beta&t=1Zo2k3OLQf5BPgH2vpr-flwhmSgZET44F-qhc2WPnko",
      description: "Software Development & Data Science Enthusiast | Computer Science & Data Science Graduate NKU (Dec '24)"
    },
    {
      name: "Yoseph Shibiru",
      role: "Full Stack Engineer",
      email: "shibiruy1@nku.edu",
      photo: "https://media.licdn.com/dms/image/v2/C4E03AQEDGMN9BApOPQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1659142629876?e=1738800000&v=beta&t=H4enUqNbSY6Ut_93lv-MBhCOxDuem6h91luBusY6h2I",
      description: "Prev Data Engineer Intern @Amazon | CS 24'"
    },
    {
      name: "Navleen Singh",
      role: "Full Stack Engineer",
      email: "singhn3@nku.edu",
      photo: "https://media.licdn.com/dms/image/v2/C5603AQHQ8nDKPb1QLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517278386255?e=1738800000&v=beta&t=FzgW4uQTQEBAUjcesz4RJq94SZnoL8dFfMEA6gle1zA",
      description: "Cognitive Computing Platform Engineer at Fidelity Investments"
    },
  ]

  return (
    <div className="container mx-auto py-12 flex">
      <NavBar />
      <div className='ml-64 flex-1 p-4'>
        <h1 className="text-4xl font-bold mx-auto mb-12 text-center">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4">
          {developers.map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

