"use client";

import React, { useState } from "react";
import { Select, ListBox, Button, Switch } from "@heroui/react";

import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { createjob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateJobForm() {
  // Retain minimal UI states needed for interaction logic
  const [isRemote, setIsRemote] = useState(false);
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");

  // State to store validation error messages
  const [errors, setErrors] = useState({});

  // Clear errors instantly on user input
  const handleInputChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Complete validation logic utilizing the extracted form entries object
  const validateForm = (data) => {
    let tempErrors = {};

    if (!data.jobTitle?.trim()) tempErrors.jobTitle = "Job title is required";
    if (!data.jobCategory)
      tempErrors.jobCategory = "Please select a job category";
    if (!data.jobType) tempErrors.jobType = "Please select a job type";

    const minSal = parseFloat(data.minSalary);
    const maxSal = parseFloat(data.maxSalary);

    if (!data.minSalary) {
      tempErrors.minSalary = "Minimum salary is required";
    } else if (isNaN(minSal) || minSal < 0) {
      tempErrors.minSalary = "Must be a valid positive number";
    }

    if (!data.maxSalary) {
      tempErrors.maxSalary = "Maximum salary is required";
    } else if (isNaN(maxSal) || maxSal < 0) {
      tempErrors.maxSalary = "Must be a valid positive number";
    } else if (minSal && maxSal < minSal) {
      tempErrors.maxSalary = "Cannot be less than minimum salary";
    }

    // Switch returns "on" string or undefined/empty in standard FormData
    const remoteChecked = data.isRemote === "on";
    if (!remoteChecked && !data.location?.trim()) {
      tempErrors.location = "Location is required when not remote";
    }

    if (!data.applicationDeadline) {
      tempErrors.applicationDeadline = "Deadline is required";
    } else {
      const selectedDate = new Date(data.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.applicationDeadline = "Deadline cannot be in the past";
      }
    }

    if (!data.responsibilities?.trim()) {
      tempErrors.responsibilities = "Core responsibilities are required";
    } else if (data.responsibilities.trim().length < 20) {
      tempErrors.responsibilities = "Must be at least 20 characters long";
    }

    if (!data.requirements?.trim()) {
      tempErrors.requirements = "Job requirements are required";
    } else if (data.requirements.trim().length < 20) {
      tempErrors.requirements = "Must be at least 20 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submission Pipeline via Object.fromEntries
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataInstance = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formDataInstance);

    // Format the final data structure cleanly
    const structuredData = {
      ...rawData,
      isRemote: rawData.isRemote === "on",
      location: rawData.isRemote === "on" ? "" : rawData.location,
    };
    const res = await createjob(structuredData);
    if (res.result?.insertedId) {
      toast.success("Post created Successfully");
      redirect("/dashboard/recruiter");
    }

    if (validateForm(structuredData)) {
      console.log("Job Post Created Successfully:", structuredData);
    } else {
      console.log("Form check failed. Correct inline field errors.");
    }
  };

  const handleReset = () => {
    setIsRemote(false);
    setJobCategory("");
    setJobType("");
    setCurrency("USD");
    setErrors({});
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
              <label
                htmlFor="jobTitle"
                className="text-sm font-medium text-gray-300"
              >
                Job Title
              </label>
              <div
                className={`flex items-center gap-2 bg-black border rounded-lg h-11 px-3 ${errors.jobTitle ? "border-danger" : "border-[#333333] hover:border-gray-500 focus-within:!border-gray-500"}`}
              >
                <FiBriefcase className="text-white min-w-[16px] shrink-0" />
                <input
                  id="jobTitle"
                  name="jobTitle"
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="bg-transparent w-full text-white placeholder:text-gray-500 text-sm focus:outline-none"
                />
              </div>
              {errors.jobTitle && (
                <span className="text-xs text-danger pl-1">
                  {errors.jobTitle}
                </span>
              )}
            </div>

          {/* Comapny id  */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="companyId"
                className="text-sm font-medium text-gray-300"
              >
                Company ID
              </label>

              <input
                type="text"
                id="companyId"
                name="companyId"
                onChange={handleInputChange}
                placeholder="Enter company ID"
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none ${
                  errors.companyId
                    ? "border-danger"
                    : "border-[#333333] hover:border-gray-500 focus:border-gray-500"
                }`}
              />

              {errors.companyId && (
                <span className="text-xs text-danger pl-1">
                  {errors.companyId}
                </span>
              )}
            </div>

            {/* Job Category */}
            <div className="flex flex-col gap-1.5">
              <label
                id="category-label"
                className="text-sm font-medium text-gray-300"
              >
                Job Category
              </label>
              <Select
                name="jobCategory"
                className="w-full"
                placeholder="Select category"
                aria-labelledby="category-label"
                selectedKeys={jobCategory ? new Set([jobCategory]) : new Set()}
                onSelectionChange={(key) => {
                  const val = Array.from(key)[0] || "";
                  setJobCategory(val);
                  setErrors((p) => ({ ...p, jobCategory: "" }));
                }}
                variant="bordered"
                classNames={{
                  trigger: `!bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500 rounded-lg h-11 ${errors.jobCategory ? "border-danger" : ""}`,
                  value: "!text-white text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select category" />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox
                    aria-label="Job Category List"
                    className="bg-black text-white"
                  >
                    <ListBox.Item id="Engineering">
                      Engineering & Development
                    </ListBox.Item>
                    <ListBox.Item id="Design">Design & Product</ListBox.Item>
                    <ListBox.Item id="Marketing">
                      Marketing & Growth
                    </ListBox.Item>
                    <ListBox.Item id="Finance">
                      Finance & Operations
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.jobCategory && (
                <span className="text-xs text-danger pl-1">
                  {errors.jobCategory}
                </span>
              )}
            </div>

             <div className="flex flex-col gap-1.5">
              <label
                htmlFor="companyId"
                className="text-sm font-medium text-gray-300"
              >
                Status
              </label>

              <input
                type="text"
                id="status"
                name="status"
                onChange={handleInputChange}
                placeholder="Enter job status"
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none ${
                  errors.companyId
                    ? "border-danger"
                    : "border-[#333333] hover:border-gray-500 focus:border-gray-500"
                }`}
              />

              {errors.companyId && (
                <span className="text-xs text-danger pl-1">
                  {errors.companyId}
                </span>
              )}
            </div>

            {/* Job Type Selector */}
            <div className="flex flex-col gap-1.5">
              <label
                id="jobtype-label"
                className="text-sm font-medium text-gray-300"
              >
                Job Type
              </label>
              <Select
                name="jobType"
                className="w-full"
                placeholder="Select type"
                aria-labelledby="jobtype-label"
                selectedKeys={jobType ? new Set([jobType]) : new Set()}
                onSelectionChange={(key) => {
                  const val = Array.from(key)[0] || "";
                  setJobType(val);
                  setErrors((p) => ({ ...p, jobType: "" }));
                }}
                variant="bordered"
                classNames={{
                  trigger: `!bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500 rounded-lg h-11 ${errors.jobType ? "border-danger" : ""}`,
                  value: "!text-white text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select type" />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox
                    aria-label="Job Type Options"
                    className="bg-black text-white"
                  >
                    <ListBox.Item id="Full-time">Full-time</ListBox.Item>
                    <ListBox.Item id="Part-time">Part-time</ListBox.Item>
                    <ListBox.Item id="Remote">Remote</ListBox.Item>
                    <ListBox.Item id="Contract">Contract</ListBox.Item>
                    <ListBox.Item id="Internship">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.jobType && (
                <span className="text-xs text-danger pl-1">
                  {errors.jobType}
                </span>
              )}
            </div>

            {/* Salary Metric Fields Grid wrapper */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 border border-[#232323] p-3 rounded-xl bg-black/40 space-y-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Salary Structure
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Min Salary */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="minSalary" className="text-xs text-gray-400">
                    Min Salary
                  </label>
                  <div
                    className={`flex items-center gap-1.5 bg-black border rounded-lg h-10 px-2.5 ${errors.minSalary ? "border-danger" : "border-[#333333]"}`}
                  >
                    <FiDollarSign className="text-white text-sm" />
                    <input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      onChange={handleInputChange}
                      placeholder="50000"
                      className="bg-transparent w-full text-white placeholder:text-gray-600 text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.minSalary && (
                    <span className="text-[11px] text-danger mt-0.5">
                      {errors.minSalary}
                    </span>
                  )}
                </div>

                {/* Max Salary */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="maxSalary" className="text-xs text-gray-400">
                    Max Salary
                  </label>
                  <div
                    className={`flex items-center gap-1.5 bg-black border rounded-lg h-10 px-2.5 ${errors.maxSalary ? "border-danger" : "border-[#333333]"}`}
                  >
                    <FiDollarSign className="text-white text-sm" />
                    <input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      onChange={handleInputChange}
                      placeholder="80000"
                      className="bg-transparent w-full text-white placeholder:text-gray-600 text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.maxSalary && (
                    <span className="text-[11px] text-danger mt-0.5">
                      {errors.maxSalary}
                    </span>
                  )}
                </div>

                {/* Currency Base Select */}
                <div className="flex flex-col gap-1">
                  <label id="currency-label" className="text-xs text-gray-400">
                    Currency
                  </label>
                  <Select
                    name="currency"
                    aria-labelledby="currency-label"
                    selectedKeys={new Set([currency])}
                    onSelectionChange={(key) =>
                      setCurrency(Array.from(key)[0] || "USD")
                    }
                    variant="bordered"
                    classNames={{
                      trigger: "!bg-black border-[#333333] rounded-lg h-10",
                      value: "!text-white text-sm",
                    }}
                  >
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox
                        aria-label="Currency Base Options"
                        className="bg-black text-white"
                      >
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
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-300"
                >
                  Location Context
                </label>
                <div className="flex items-center gap-2 bg-black px-2.5 py-1 rounded-md border border-[#2b2b2b]">
                  <span className="text-xs text-gray-400">Fully Remote</span>
                  <Switch
                    name="isRemote"
                    size="sm"
                    color="default"
                    isSelected={isRemote}
                    onValueChange={(checked) => {
                      setIsRemote(checked);
                      if (checked) setErrors((p) => ({ ...p, location: "" }));
                    }}
                    aria-label="Toggle Remote Location"
                  />
                </div>
              </div>
              <div
                className={`flex items-center gap-2 border rounded-lg h-11 px-3 ${isRemote ? "!bg-[#222222] opacity-40 border-[#333333]" : "bg-black border-[#333333] hover:border-gray-500 focus-within:!border-gray-500"} ${errors.location ? "border-danger" : ""}`}
              >
                <FiMapPin className="text-white min-w-[16px] shrink-0" />
                <input
                  id="location"
                  name="location"
                  onChange={handleInputChange}
                  disabled={isRemote}
                  placeholder={
                    isRemote
                      ? "Configured as Global Remote"
                      : "e.g. Dhaka, Bangladesh"
                  }
                  className="bg-transparent w-full text-white placeholder:text-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
              {errors.location && (
                <span className="text-xs text-danger pl-1">
                  {errors.location}
                </span>
              )}
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="applicationDeadline"
                className="text-sm font-medium text-gray-300"
              >
                Application Deadline
              </label>
              <div
                className={`flex items-center gap-2 bg-black border rounded-lg h-11 px-3 ${errors.applicationDeadline ? "border-danger" : "border-[#333333] hover:border-gray-500 focus-within:!border-gray-500"}`}
              >
                <FiCalendar className="text-white min-w-[16px] shrink-0" />
                <input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  onChange={handleInputChange}
                  className="bg-transparent w-full text-white text-sm focus:outline-none [color-scheme:dark]"
                />
              </div>
              {errors.applicationDeadline && (
                <span className="text-xs text-danger pl-1">
                  {errors.applicationDeadline}
                </span>
              )}
            </div>
          </div>

          {/* Textarea Blocks */}
          <div className="space-y-4 pt-2">
            {/* Responsibilities */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="responsibilities"
                className="text-sm font-medium text-gray-300"
              >
                Key Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                onChange={handleInputChange}
                rows={4}
                placeholder="Outline core expectations, day-to-day operations..."
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none ${errors.responsibilities ? "border-danger" : "border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500"}`}
              />
              {errors.responsibilities && (
                <span className="text-xs text-danger pl-1">
                  {errors.responsibilities}
                </span>
              )}
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="requirements"
                className="text-sm font-medium text-gray-300"
              >
                Core Requirements & Qualifications
              </label>
              <textarea
                id="requirements"
                name="requirements"
                onChange={handleInputChange}
                rows={4}
                placeholder="Experience metrics, tech stacks requested..."
                className={`bg-black border rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none ${errors.requirements ? "border-danger" : "border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500"}`}
              />
              {errors.requirements && (
                <span className="text-xs text-danger pl-1">
                  {errors.requirements}
                </span>
              )}
            </div>

            {/* Benefits Optional */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="benefits"
                  className="text-sm font-medium text-gray-300"
                >
                  Perks & Benefits
                </label>
                <span className="text-[10px] bg-[#2a2a2a] px-1.5 py-0.5 text-gray-400 font-semibold rounded-md uppercase">
                  Optional
                </span>
              </div>
              <textarea
                id="benefits"
                name="benefits"
                rows={3}
                placeholder="Health coverage, PTO, flexible working parameters..."
                className="bg-black border border-[#333333] hover:border-gray-500 focus:focus-within:border-gray-500 rounded-lg p-3 text-white placeholder:text-gray-500 text-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
            <Button
              type="reset"
              variant="bordered"
              className="border-[#333333] text-white hover:bg-[#222222] rounded-lg font-medium px-5 w-full sm:w-auto h-10"
              onClick={handleReset}
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
