"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlusCircle, FiUploadCloud, FiEdit3, FiGlobe, FiMapPin, FiUsers, FiBriefcase } from "react-icons/fi";
import { Modal, Button, Select, ListBox } from "@heroui/react";
import { createcompany } from "@/lib/core/company";

export default function CompanyRegistration({user,RecruiterCompany}) {
  // use state for modal open and close 
  const [isOpen, setIsOpen] = useState(false);
  
  // after from submit all data save this state
  const [company, setCompany] = useState(RecruiterCompany);

  const [industry, setIndustry] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  // logo select max mb validation
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      setLogo(null);
      return;
    }

    setLogo(file);
  };

  // upload in ImgBB 
  const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  // form submit handaler
  const handleSubmit = async (e, closeForm) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      let logoUrl = company?.logo || ""; 

      if (logo) {
        logoUrl = await uploadImageToImageBB(logo);
      }

      const rawData = Object.fromEntries(formData);

      const companyData = {
        ...rawData,
        industry, 
        employeeRange, 
        logo: logoUrl,
        createdAt: new Date(),
        recruiterId:user.id,
        status:"Pending"
      };

      setCompany(companyData);

      const payload =await createcompany(companyData)
      // console.log(payload)
        if (payload.success){
           toast.success("Company Registered Successfully");
      closeForm();
        }
      
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // when already copmany registration 
  if (company?._id) {
    return (
      <div className="relative max-w-4xl mx-auto bg-[#18181b] border border-[#27272a] rounded-xl p-8 text-white shadow-xl">
        
        {/* EDIT BUTTON */}
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute top-6 right-6 flex items-center gap-2 bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#3f3f46] transition-colors"
        >
          <FiEdit3 className="text-sm" /> Edit Profile
        </button>

        <div className="flex items-center gap-5 pb-6 border-b border-[#27272a]">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt="Logo" 
              className="w-20 h-20 rounded-xl object-cover bg-black border border-[#333333]"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-black border border-[#333333] flex items-center justify-center text-2xl font-bold text-gray-500">
              {company.companyName?.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-orange-600 font-bold ">{company.status}</p>
            <h1 className="text-2xl font-bold pr-24">{company.companyName}</h1>
            <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
              <FiBriefcase className="text-gray-500" /> {company.industry || "Not Specified"}
            </p>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center gap-3 bg-black/30 p-4 rounded-lg border border-[#27272a]">
            <FiMapPin className="text-xl text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm font-medium text-gray-200">{company.location || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/30 p-4 rounded-lg border border-[#27272a]">
            <FiUsers className="text-xl text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Employees</p>
              <p className="text-sm font-medium text-gray-200">{company.employeeRange || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/30 p-4 rounded-lg border border-[#27272a]">
            <FiGlobe className="text-xl text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Website</p>
              {company.website ? (
                <a href={company.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-400 hover:underline truncate block max-w-[150px]">
                  {company.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-200">N/A</p>
              )}
            </div>
          </div>
        </div>

        {company.description && (
          <div className="mt-6 bg-black/10 p-5 rounded-lg border border-[#27272a]">
            <h3 className="text-sm font-semibold mb-2 text-gray-400">About Company</h3>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {company.description}
            </p>
          </div>
        )}

        <ModalIsOpenWrapper 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          handleSubmit={handleSubmit}
          loading={loading}
          industry={industry}
          setIndustry={setIndustry}
          employeeRange={employeeRange}
          setEmployeeRange={setEmployeeRange}
          handleLogoChange={handleLogoChange}
          logo={logo}
          company={company}
        />
      </div>
    );
  }

  // whitout registration company show this ui
  return (
    <>
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-8 text-center max-w-md mx-auto">
        <h2 className="text-white text-xl font-semibold mb-2">
          Register Your Company
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          You must register your company before posting jobs.
        </p>
        <Button
          className="bg-white text-black font-semibold"
          startContent={<FiPlusCircle />}
          onClick={() => setIsOpen(true)}
        >
          Register Company
        </Button>
      </div>

      <ModalIsOpenWrapper 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        handleSubmit={handleSubmit}
        loading={loading}
        industry={industry}
        setIndustry={setIndustry}
        employeeRange={employeeRange}
        setEmployeeRange={setEmployeeRange}
        handleLogoChange={handleLogoChange}
        logo={logo}
        company={company}
      />
    </>
  );
}

// clone modal
function ModalIsOpenWrapper({ 
  isOpen, setIsOpen, handleSubmit, loading, industry, setIndustry, 
  employeeRange, setEmployeeRange, handleLogoChange, logo, company 
}) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="4xl" style={{ content: { maxWidth: '56rem' } }}>
      <Modal.Backdrop>
        <Modal.Container size="cover">
          <Modal.Dialog className="w-full max-w-4xl bg-[#18181b] border border-[#27272a] text-white rounded-xl">
            {() => (
              <form onSubmit={(e) => handleSubmit(e, () => setIsOpen(false))}>
                <Modal.CloseTrigger onClick={() => setIsOpen(false)} />

                <Modal.Header className="border-b border-[#27272a]">
                  <div>
                    <Modal.Heading className="text-xl font-semibold text-white">
                      {company ? "Edit Company Details" : "Register New Company"}
                    </Modal.Heading>
                    <p className="text-sm text-gray-400 mt-1">
                      Enter your business details to start hiring.
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body className="p-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Company Name
                      </label>
                      <input
                        name="companyName"
                        placeholder="Acme Corp"
                        defaultValue={company?.companyName || ""}
                        required
                        className="w-full h-11 px-3 rounded-lg bg-black border border-[#333333] text-white outline-none"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Industry
                      </label>
                      <Select
                        placeholder="Select Industry"
                        value={industry}
                        onChange={(val) => setIndustry(val ? String(val) : "")}
                      >
                        <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                          <Select.Value>
                            {industry || company?.industry || "Select Industry"}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox className="bg-[#18181b] text-white">
                            <ListBox.Item id="Technology" textValue="Technology">Technology</ListBox.Item>
                            <ListBox.Item id="Healthcare" textValue="Healthcare">Healthcare</ListBox.Item>
                            <ListBox.Item id="Finance" textValue="Finance">Finance</ListBox.Item>
                            <ListBox.Item id="Education" textValue="Education">Education</ListBox.Item>
                            <ListBox.Item id="Marketing" textValue="Marketing">Marketing</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Website URL
                      </label>
                      <input
                        name="website"
                        type="url"
                        placeholder="https://company.com"
                        defaultValue={company?.website || ""}
                        className="w-full h-11 px-3 rounded-lg bg-black border border-[#333333] text-white outline-none"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Location
                      </label>
                      <input
                        name="location"
                        placeholder="Dhaka, Bangladesh"
                        defaultValue={company?.location || ""}
                        className="w-full h-11 px-3 rounded-lg bg-black border border-[#333333] text-white outline-none"
                      />
                    </div>

                    {/* Employee Range */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Employee Range
                      </label>
                      <Select
                        placeholder="Employee Range"
                        value={employeeRange}
                        onChange={(val) => setEmployeeRange(val ? String(val) : "")}
                      >
                        <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                          <Select.Value>
                            {employeeRange || company?.employeeRange || "Employee Range"}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox className="bg-[#18181b] text-white">
                            <ListBox.Item id="1-10 employees" textValue="1-10 employees">1-10 employees</ListBox.Item>
                            <ListBox.Item id="11-50 employees" textValue="11-50 employees">11-50 employees</ListBox.Item>
                            <ListBox.Item id="51-200 employees" textValue="51-200 employees">51-200 employees</ListBox.Item>
                            <ListBox.Item id="201-500 employees" textValue="201-500 employees">201-500 employees</ListBox.Item>
                            <ListBox.Item id="500+ employees" textValue="500+ employees">500+ employees</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Logo Upload Field */}
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Company Logo (Max 5MB)
                      </label>
                      <div className="flex items-center gap-3 w-full h-11 px-3 rounded-lg bg-black border border-[#333333] text-white">
                        <FiUploadCloud className="text-gray-400 text-xl flex-shrink-0" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="w-full text-sm text-gray-400 file:hidden cursor-pointer outline-none"
                        />
                        {(logo || company?.logo) && (
                          <span className="text-xs bg-[#27272a] px-2 py-1 rounded text-gray-300 max-w-[100px] truncate">
                            {logo ? "New Selected" : "Kept Logo"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5">
                    <label className="text-sm text-gray-300 mb-2 block">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      placeholder="Tell us about your company..."
                      defaultValue={company?.description || ""}
                      className="w-full rounded-lg bg-black border border-[#333333] p-3 text-white resize-none outline-none"
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t border-[#27272a]">
                  <Button type="button" onClick={() => setIsOpen(false)} variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" isLoading={loading}>
                    {company ? "Save Changes" : "Register Company"}
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}