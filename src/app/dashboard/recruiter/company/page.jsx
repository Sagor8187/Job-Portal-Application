"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlusCircle, FiUploadCloud } from "react-icons/fi";
import { Modal, Button, Select, ListBox } from "@heroui/react";

export default function CompanyRegistration() {
  const [industry, setIndustry] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const companyExists = false;
  if (companyExists) return null;

  // লোগো সিলেক্ট করার সময় সাইজ ভ্যালিডেশন (Max 5MB)
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

  // ImgBB-তে ইমেজ আপলোড করার ফাংশন
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

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e, closeForm) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      let logoUrl = "";

      if (logo) {
        logoUrl = await uploadImageToImageBB(logo);
      }

      const rawData = Object.fromEntries(formData);

      const companyData = {
        ...rawData,
        industry, // স্টেট থেকে পুরো ভ্যালু চলে যাবে
        employeeRange, // স্টেট থেকে পুরো ভ্যালু চলে যাবে
        logo: logoUrl,
        createdAt: new Date(),
      };

      console.log(companyData);

      toast.success("Company Registered Successfully");
      if (closeForm) closeForm();
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* মূল কার্ড ও বাটন */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-8 text-center">
        <h2 className="text-white text-xl font-semibold mb-2">
          Register Your Company
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          You must register your company before posting jobs.
        </p>

        <Button
          className="bg-white text-black font-semibold"
          startContent={<FiPlusCircle />}
        >
          Register Company
        </Button>
      </div>

      {/* ব্যাকড্রপ ও কন্টেইনার স্ট্রাকচার */}
      <Modal.Backdrop>
        <Modal.Container size="cover">
          <Modal.Dialog className="w-full max-w-4xl bg-[#18181b] border border-[#27272a] text-white rounded-xl">
            {({ close }) => (
              <form onSubmit={(e) => handleSubmit(e, close)}>
                <Modal.CloseTrigger />

                <Modal.Header className="border-b border-[#27272a]">
                  <div>
                    <Modal.Heading className="text-xl font-semibold text-white">
                      Register New Company
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
                        value={industry} // সরাসরি সিলেক্ট কম্পোনেন্টে ভ্যালু কন্ট্রোল
                        onChange={(val) => setIndustry(val ? String(val) : "")} // কাস্টম ইভেন্ট হ্যান্ডলার
                      >
                        <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                          <Select.Value>
                            {industry || "Select Industry"}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          {/* ListBox এর ভেতর থেকে onSelectionChange বা selectedKeys এর ঝামেলা বাদ দেওয়া হয়েছে */}
                          <ListBox className="bg-[#18181b] text-white">
                            <ListBox.Item
                              id="Technology"
                              textValue="Technology"
                            >
                              Technology
                            </ListBox.Item>
                            <ListBox.Item
                              id="Healthcare"
                              textValue="Healthcare"
                            >
                              Healthcare
                            </ListBox.Item>
                            <ListBox.Item id="Finance" textValue="Finance">
                              Finance
                            </ListBox.Item>
                            <ListBox.Item id="Education" textValue="Education">
                              Education
                            </ListBox.Item>
                            <ListBox.Item id="Marketing" textValue="Marketing">
                              Marketing
                            </ListBox.Item>
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
                        value={employeeRange} // সরাসরি সিলেক্ট কম্পোনেন্টে ভ্যালু কন্ট্রোল
                        onChange={(val) =>
                          setEmployeeRange(val ? String(val) : "")
                        }
                      >
                        <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                          <Select.Value>
                            {employeeRange || "Employee Range"}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox className="bg-[#18181b] text-white">
                            <ListBox.Item
                              id="1-10 employees"
                              textValue="1-10 employees"
                            >
                              1-10 employees
                            </ListBox.Item>
                            <ListBox.Item
                              id="11-50 employees"
                              textValue="11-50 employees"
                            >
                              11-50 employees
                            </ListBox.Item>
                            <ListBox.Item
                              id="51-200 employees"
                              textValue="51-200 employees"
                            >
                              51-200 employees
                            </ListBox.Item>
                            <ListBox.Item
                              id="201-500 employees"
                              textValue="201-500 employees"
                            >
                              201-500 employees
                            </ListBox.Item>
                            <ListBox.Item
                              id="500+ employees"
                              textValue="500+ employees"
                            >
                              500+ employees
                            </ListBox.Item>
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
                        {logo && (
                          <span className="text-xs bg-[#27272a] px-2 py-1 rounded text-gray-300 max-w-[100px] truncate">
                            Selected
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
                      className="w-full rounded-lg bg-black border border-[#333333] p-3 text-white resize-none outline-none"
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t border-[#27272a]">
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" isLoading={loading}>
                    Register Company
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
