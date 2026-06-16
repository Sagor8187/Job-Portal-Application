"use client";

import React, { useState } from "react";
import {
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
  Switch,
} from "@heroui/react";

import { FiMapPin, FiBriefcase, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function CreateJobForm() {
  // Main form data state
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCategory: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemote: false,
    applicationDeadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  // State to store validation error messages
  const [errors, setErrors] = useState({});

  // Handler for standard text, number, and date input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error message instantly when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handler for custom Select dropdown triggers
  const handleSelect = (key, field) => {
    const value = Array.from(key)[0];
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear targeted selection error state
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handler for the boolean toggle (Remote Switch)
  const handleToggle = (checked) => {
    setFormData((prev) => {
      const updated = { ...prev, isRemote: checked, location: checked ? "" : prev.location };
      if (checked && errors.location) {
        setErrors((errPrev) => ({ ...errPrev, location: "" }));
      }
      return updated;
    });
  };

  // Complete validation logic
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.jobTitle.trim()) tempErrors.jobTitle = "Job title is required";
    if (!formData.jobCategory) tempErrors.jobCategory = "Please select a job category";
    if (!formData.jobType) tempErrors.jobType = "Please select a job type";
    
    const minSal = parseFloat(formData.minSalary);
    const maxSal = parseFloat(formData.maxSalary);

    if (!formData.minSalary) {
      tempErrors.minSalary = "Minimum salary is required";
    } else if (isNaN(minSal) || minSal < 0) {
      tempErrors.minSalary = "Must be a valid positive number";
    }

    if (!formData.maxSalary) {
      tempErrors.maxSalary = "Maximum salary is required";
    } else if (isNaN(maxSal) || maxSal < 0) {
      tempErrors.maxSalary = "Must be a valid positive number";
    } else if (minSal && maxSal < minSal) {
      tempErrors.maxSalary = "Cannot be less than minimum salary";
    }

    if (!formData.isRemote && !formData.location.trim()) {
      tempErrors.location = "Location is required when not remote";
    }

    if (!formData.applicationDeadline) {
      tempErrors.applicationDeadline = "Deadline is required";
    } else {
      const selectedDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.applicationDeadline = "Deadline cannot be in the past";
      }
    }

    if (!formData.responsibilities.trim()) {
      tempErrors.responsibilities = "Core responsibilities are required";
    } else if (formData.responsibilities.trim().length < 20) {
      tempErrors.responsibilities = "Must be at least 20 characters long";
    }

    if (!formData.requirements.trim()) {
      tempErrors.requirements = "Job requirements are required";
    } else if (formData.requirements.trim().length < 20) {
      tempErrors.requirements = "Must be at least 20 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submission Pipeline
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Job Post Created Successfully:", formData);
    } else {
      console.log("Form check failed. Correct inline field errors.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 md:p-6 bg-[#121212]">
      <div className="w-full max-w-2xl bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl p-4 sm:p-6 space-y-6">
        
        {/* HEADER BLOCK */}
        <div>
          <h2 className="text-xl font-semibold text-white">Post a New Job</h2>
          <p className="text-xs text-gray-400 mt-1">
            Fill out the details to post a vacancy position on HireLoop.
          </p>
        </div>

        {/* INPUT WORKBENCH */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Job Title */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="jobTitle" className="text-sm font-medium text-gray-300">Job Title</label>
              <div className={`flex items-center gap-2 bg-black border rounded-lg h-11 px-3 ${errors.jobTitle ? 'border-danger' : 'border-[#333333] hover:border-gray-500 focus-within:!border-gray-500'}`}>
                <FiBriefcase className="text-white min-w-[16px] shrink-0" />
                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="bg-transparent w-full text-white placeholder:text-gray-500 text-sm focus:outline-none"
                />
              </div>
              {errors.jobTitle && <span className="text-xs text-danger pl-1">{errors.jobTitle}</span>}
            </div>

            {/* Job Category */}
            <div className="flex flex-col gap-1.5">
              <label id="category-label" className="text-sm font-medium text-gray-300">Job Category</label>
              <Select
                className="w-full"
                placeholder="Select category"
                aria-labelledby="category-label"
                selectedKeys={formData.jobCategory ? new Set([formData.jobCategory]) : new Set()}
                onSelectionChange={(key) => handleSelect(key, "jobCategory")}
                variant="bordered"
                classNames={{
                  trigger: `!bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500 rounded-lg h-11 ${errors.jobCategory ? 'border-danger' : ''}`,
                  value: "!text-white text-sm"
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select category" />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox aria-label="Job Category List" className="bg-black text-white">
                    <ListBox.Item id="Engineering">Engineering & Development</ListBox.Item>
                    <ListBox.Item id="Design">Design & Product</ListBox.Item>
                    <ListBox.Item id="Marketing">Marketing & Growth</ListBox.Item>
                    <ListBox.Item id="Finance">Finance & Operations</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.jobCategory && <span className="text-xs text-danger pl-1">{errors.jobCategory}</span>}
            </div>

            {/* Job Type Selector */}
            <div className="flex flex-col gap-1.5">
              <label id="jobtype-label" className="text-sm font-medium text-gray-300">Job Type</label>
              <Select
                className="w-full"
                placeholder="Select type"
                aria-labelledby="jobtype-label"
                selectedKeys={formData.jobType ? new Set([formData.jobType]) : new Set()}
                onSelectionChange={(key) => handleSelect(key, "jobType")}
                variant="bordered"
                classNames={{
                  trigger: `!bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500 rounded-lg h-11 ${errors.jobType ? 'border-danger' : ''}`,
                  value: "!text-white text-sm"
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select type" />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox aria-label="Job Type Options" className="bg-black text-white">
                    <ListBox.Item id="Full-time">Full-time</ListBox.Item>
                    <ListBox.Item id="Part-time">Part-time</ListBox.Item>
                    <ListBox.Item id="Remote">Remote</ListBox.Item>
                    <ListBox.Item id="Contract">Contract</ListBox.Item>
                    <ListBox.Item id="Internship">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.jobType && <span className="text-xs text-danger pl-1">{errors.jobType}</span>}
            </div>

            {/* Salary Metric Fields Grid wrapper */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 border border-[#232323] p-3 rounded-xl bg-black/40 space-y-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Salary Structure</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Min Salary */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="minSalary" className="text-xs text-gray-400">Min Salary</label>
                  <div className={`flex items-center gap-1.5 bg-black border rounded-lg h-10 px-2.5 ${errors.minSalary ? 'border-danger' : 'border-[#333333]'}`}>
                    <FiDollarSign className="text-white text-sm" />
                    <input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      value={formData.minSalary}
                      onChange={handleChange}
                      placeholder="50000"
                      className="bg-transparent w-full text-white placeholder:text-gray-600 text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.minSalary && <span className="text-[11px] text-danger mt-0.5">{errors.minSalary}</span>}
                </div>

                {/* Max Salary */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="maxSalary" className="text-xs text-gray-400">Max Salary</label>
                  <div className={`flex items-center gap-1.5 bg-black border rounded-lg h-10 px-2.5 ${errors.maxSalary ? 'border-danger' : 'border-[#333333]'}`}>
                    <FiDollarSign className="text-white text-sm" />
                    <input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      placeholder="80000"
                      className="bg-transparent w-full text-white placeholder:text-gray-600 text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.maxSalary && <span className="text-[11px] text-danger mt-0.5">{errors.maxSalary}</span>}
                </div>

                {/* Currency Base Select */}
                <div className="flex flex-col gap-1">
                  <label id="currency-label" className="text-xs text-gray-400">Currency</label>
                  <Select
                    aria-labelledby="currency-label"
                    selectedKeys={new Set([formData.currency])}
                    onSelectionChange={(key) => handleSelect(key, "currency")}
                    variant="bordered"
                    classNames={{
                      trigger: "!bg-black border-[#333333] rounded-lg h-10",
                      value: "!text-white text-sm"
                    }}
                  >
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox aria-label="Currency Base Options" className="bg-black text-white">
                        <ListBox.Item id="USD">USD ($)</ListBox.Item>
                        <ListBox.Item id="EUR">EUR (€)</ListBox.Item>
                        <ListBox.Item id="GBP">GBP (£)</ListBox.Item>
                        <ListBox.Item id="BDT">BDT (৳)</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location Context Controls */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <div className="flex items-center justify-between pb-1">
                <label htmlFor="location" className="text-sm font-medium text-gray-300">Location Context</label>
                <div className="flex items-center gap-2 bg-black px-2.5 py-1 rounded-md border border-[#2b2b2b]">
                  <span className="text-xs text-gray-400">Fully Remote</span>
                  <Switch
                    size="sm"
                    color="default"
                    isSelected={formData.isRemote}
                    onValueChange={handleToggle}
                    aria-label="Toggle Remote Location"
                  />
                </div>
              </div>
              <div className={`flex items-center gap-2 border rounded-lg h-11 px-3 ${formData.isRemote ? '!bg-[#222222] opacity-40 border-[#333333]' : 'bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500'} ${errors.location ? 'border-danger' : ''}`}>
                <FiMapPin className="text-white min-w-[16px] shrink-0" />
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={formData.isRemote}
                  placeholder={formData.isRemote ? "Configured as Global Remote" : "e.g. Dhaka, Bangladesh"}
                  className="bg-transparent w-full text-white placeholder:text-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
              {errors.location && <span className="text-xs text-danger pl-1">{errors.location}</span>}
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="applicationDeadline" className="text-sm font-medium text-gray-300">Application Deadline</label>
              <div className={`flex items-center gap-2 bg-black border rounded-lg h-11 px-3 ${errors.applicationDeadline ? 'border-danger' : 'border-[#333333] hover:border-gray-500 focus-within:!border-gray-500'}`}>
                <FiCalendar className="text-white min-w-[16px] shrink-0" />
                <input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="bg-transparent w-full text-white text-sm focus:outline-none [color-scheme:dark]"
                />
              </div>
              {errors.applicationDeadline && <span className="text-xs text-danger pl-1">{errors.applicationDeadline}</span>}
            </div>
          </div>

          {/* Textarea Blocks */}
          <div className="space-y-4 pt-2">
            
            {/* Responsibilities */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="responsibilities" className="text-sm font-medium text-gray-300">Key Responsibilities</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
                placeholder="Outline core expectations, day-to-day operations..."
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none ${errors.responsibilities ? 'border-danger' : 'border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500'}`}
              />
              {errors.responsibilities && <span className="text-xs text-danger pl-1">{errors.responsibilities}</span>}
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="requirements" className="text-sm font-medium text-gray-300">Core Requirements & Qualifications</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="Experience metrics, tech stacks requested..."
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none ${errors.requirements ? 'border-danger' : 'border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500'}`}
              />
              {errors.requirements && <span className="text-xs text-danger pl-1">{errors.requirements}</span>}
            </div>

            {/* Benefits Optional */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <label htmlFor="benefits" className="text-sm font-medium text-gray-300">Perks & Benefits</label>
                <span className="text-[10px] bg-[#2a2a2a] px-1.5 py-0.5 text-gray-400 font-semibold rounded-md uppercase">Optional</span>
              </div>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                placeholder="Health coverage, PTO, flexible working parameters..."
                className="bg-black border border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500 rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
            <Button 
              type="button"
              variant="bordered"
              className="border-[#333333] text-white hover:bg-[#222222] rounded-lg font-medium px-5 w-full sm:w-auto h-10"
              onClick={() => setFormData({
                jobTitle: "", jobCategory: "", jobType: "", minSalary: "", maxSalary: "",
                currency: "USD", location: "", isRemote: false, applicationDeadline: "",
                responsibilities: "", requirements: "", benefits: ""
              })}
            >
              Reset
            </Button>
            <Button 
              type="submit"
              className="bg-white text-black font-bold rounded-lg px-5 w-full sm:w-auto h-10 hover:bg-gray-200 transition-colors"
            >
              Publish Job Post
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}