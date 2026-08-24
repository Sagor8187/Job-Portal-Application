"use client";

import React, { useState } from "react";
import { 
  TextField, 
  Input, 
  Label, 
  TextArea, 
  Select, 
  ListBox, 
  FieldError, 
  Description, 
  Button 
} from "@heroui/react";
import { jobapply } from "@/lib/api/application";

export default function JobApply({ applicant, jobdata }) {
  const [name, setName] = useState(applicant?.name || "");
  const [email, setEmail] = useState(applicant?.email || "");
  const [phone, setPhone] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState(""); 
  const [coverLetter, setCoverLetter] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // that is validation logic
  const isNameInvalid = name.length > 0 && name.length < 3;
  const isEmailInvalid = email.length > 0 && !/\S+@\S+\.\S+/.test(email);
  const isPhoneInvalid = phone.length > 0 && phone.length < 11;
  const isResumeInvalid = resumeLink.length > 0 && !/^https?:\/\/.+/.test(resumeLink);
  const isPortfolioInvalid = portfolioLink.length > 0 && !/^https?:\/\/.+/.test(portfolioLink); 
  const isCoverLetterInvalid = coverLetter.length > 0 && coverLetter.length < 20;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isNameInvalid || isEmailInvalid || isPhoneInvalid || isResumeInvalid || isPortfolioInvalid || isCoverLetterInvalid || !experience) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    setIsLoading(true);
    
    const applicantData = {
       name, 
       email,
        phone,
         expectedSalary, 
         experience,
          resumeLink,
           portfolioLink,
            coverLetter,
            applicantId:applicant.id,
            jobId:jobdata._id,
            status:"applied"
          }
    const res =await jobapply(applicantData)
    // console.log(jobdata._id)

    // console.log("Submitted:",{ name, email, phone, expectedSalary, experience, resumeLink, portfolioLink, coverLetter });
    
    // setTimeout(() => {
      setIsLoading(false);
    //   alert("Application submitted successfully!");
    // }, 1500);
  };
  

  return (
    <div className="min-h-screen w-full bg-zinc-950">
      <div className="dark max-w-2xl mx-auto p-6 bg-zinc-900 text-zinc-100 rounded-xl shadow-xl border border-zinc-800 my-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Apply for Position</h2>
        {jobdata?.title && (
          <p className="text-zinc-400 mt-1">
            Role: <span className="text-blue-400 font-semibold">{jobdata.title}</span>
          </p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Name Field */}
        <TextField isRequired isInvalid={isNameInvalid} value={name} onChange={setName}>
          <Label className="text-zinc-300">Full Name</Label>
          <Input placeholder="Enter your full name" className="bg-zinc-800 text-white border-zinc-700" />
          {isNameInvalid && <FieldError className="text-danger">Name must be at least 3 characters.</FieldError>}
        </TextField>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField isRequired isInvalid={isEmailInvalid} value={email} onChange={setEmail}>
            <Label className="text-zinc-300">Email</Label>
            <Input placeholder="example@mail.com" className="bg-zinc-800 text-white border-zinc-700" />
            {isEmailInvalid && <FieldError className="text-danger">Enter a valid email.</FieldError>}
          </TextField>

          <TextField isRequired isInvalid={isPhoneInvalid} value={phone} onChange={setPhone}>
            <Label className="text-zinc-300">Phone Number</Label>
            <Input placeholder="017XXXXXXXX" className="bg-zinc-800 text-white border-zinc-700" />
            {isPhoneInvalid && <FieldError className="text-danger">Enter a valid phone number.</FieldError>}
          </TextField>
        </div>

        {/* Experience & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <TextField name="expectedSalary" value={expectedSalary} onChange={setExpectedSalary}>
            <Label className="text-zinc-300">Expected Salary (BDT)</Label>
            <Input placeholder="e.g. 40000" className="bg-zinc-800 text-white border-zinc-700" />
          </TextField>

          {/* Experience Select */}
          <div className="flex flex-col gap-1 w-full">
            <Select
              isRequired
              className="w-full"
              selectedKeys={experience ? [experience] : []}
              onSelectionChange={(key) => setExperience(key?.toString() || "")}
            >
              <Label className="text-zinc-300">Experience Level</Label>
              <Select.Trigger className="w-full bg-zinc-800 text-white border-zinc-700 flex justify-between items-center px-3 py-2 rounded-lg">
                <Select.Value placeholder="Select experience" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl text-white">
                  <ListBox.Item id="fresher" className="hover:bg-zinc-700 p-2 rounded">Fresher</ListBox.Item>
                  <ListBox.Item id="1-2 years" className="hover:bg-zinc-700 p-2 rounded">1-2 Years</ListBox.Item>
                  <ListBox.Item id="3-5 years" className="hover:bg-zinc-700 p-2 rounded">3-5 Years</ListBox.Item>
                  <ListBox.Item id="5+ years" className="hover:bg-zinc-700 p-2 rounded">5+ Years</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Resume Link Section */}
        <TextField isRequired isInvalid={isResumeInvalid} value={resumeLink} onChange={setResumeLink}>
          <Label className="text-zinc-300">Resume Link (Google Drive / Dropbox)</Label>
          <Input placeholder="https://drive.google.com/..." className="bg-zinc-800 text-white border-zinc-700" />
          {isResumeInvalid ? (
            <FieldError className="text-danger">Please enter a valid URL starting with http:// or https://</FieldError>
          ) : (
            <Description className="text-zinc-500">Make sure the link sharing option is set to Public.</Description>
          )}
        </TextField>

        {/* Portfolio or Website URL Section */}
        <TextField isInvalid={isPortfolioInvalid} value={portfolioLink} onChange={setPortfolioLink}>
          <Label className="text-zinc-300">Portfolio or Website URL</Label>
          <Input placeholder="https://yourportfolio.com" className="bg-zinc-800 text-white border-zinc-700" />
          {isPortfolioInvalid ? (
            <FieldError className="text-danger">Please enter a valid URL starting with http:// or https://</FieldError>
          ) : (
            <Description className="text-zinc-500">Share your personal website, GitHub, or Behance profile.</Description>
          )}
        </TextField>

        {/* Cover Letter */}
        <TextField isRequired isInvalid={isCoverLetterInvalid} value={coverLetter} onChange={setCoverLetter}>
          <Label className="text-zinc-300">Cover Letter</Label>
          <TextArea placeholder="Tell us why you are a good fit..." className="bg-zinc-800 text-white border-zinc-700" />
          {isCoverLetterInvalid ? (
            <FieldError className="text-danger">Must be at least 20 characters.</FieldError>
          ) : (
            <Description className="text-zinc-500">Minimum 20 characters ({coverLetter.length}/20).</Description>
          )}
        </TextField>

        {/* Submit Button */}
        <div className="flex justify-end mt-2">
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="w-full md:w-auto font-medium bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}