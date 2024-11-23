"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, FileText, Upload, Edit2, Check, X } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/router";


export default function ProfilePage() {
  const { isSignedIn } = useAuth();

  const [bio, setBio] = useState(
    "Passionate developer with a knack for creating efficient and scalable web applications. Always eager to learn new technologies and solve complex problems."
  );
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "AWS",
  ]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [about, setAbout] = useState(
    "I'm a software engineer with 5 years of experience in web development."
  );
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadTime, setUploadTime] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("Full Stack Developer");
  const [city, setCity] = useState("San Francisco, CA");
  const [isEditingJobTitle, setIsEditingJobTitle] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);

  // reference for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setUploadTime(new Date().toLocaleString());

      // read the file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result;       
        console.log(content);
      };
    }
    // Reset the input value to allow uploading the same file again
    event.target.value = "";
  };
  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
    console.log("triggerFileInputClick");
  };



  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="container mx-auto p-4 space-y-6 w-[90%] md:w-[50%]">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 md:h-32 md:w-32">
              <AvatarImage src="https://robohash.org/txc" alt="Robo Hash" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">John Doe</CardTitle>
              {isEditingJobTitle ? (
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-6 py-1 text-sm"
                  />
                  <Button size="sm" onClick={() => setIsEditingJobTitle(false)}>
                    Save
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {jobTitle}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingJobTitle(true)}
                  >
                    <Edit2 className="h-3 w-3" />
                    <span className="sr-only">Edit job title</span>
                  </Button>
                </p>
              )}
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {isEditingCity ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-6 py-1 text-sm"
                    />
                    <Button size="sm" onClick={() => setIsEditingCity(false)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    {city}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingCity(true)}
                    >
                      <Edit2 className="h-3 w-3" />
                      <span className="sr-only">Edit city</span>
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Top Skills</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingSkills(!isEditingSkills)}
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Edit skills</span>
                </Button>
              </div>
              {isEditingSkills ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-xs"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove skill</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-grow"
                    />
                    <Button onClick={handleAddSkill}>Add</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Bio</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingBio(!isEditingBio)}
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Edit bio</span>
                </Button>
              </div>
              {isEditingBio ? (
                <div className="space-y-2">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={() => setIsEditingBio(false)}>Save</Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              <span>{resumeFile ? resumeFile.name : "No resume uploaded"}</span>
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={triggerFileInputClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </div>
          </div>
          {uploadTime && (
            <p className="text-sm text-muted-foreground">
              Uploaded on: {uploadTime}
            </p>
          )}
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">About</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingAbout(!isEditingAbout)}
            >
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit about section</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isEditingAbout ? (
            <div className="space-y-2">
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
              />
              <Button onClick={() => setIsEditingAbout(false)}>Save</Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{about}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
