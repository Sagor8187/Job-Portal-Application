"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  Modal,
  Button,
  Select,
  ListBox,
} from "@heroui/react";

export default function CompanyRegistrationModal({
  open, // এই প্রপটি আপনি প্যারেন্ট থেকে 'open' হিসেবেই পাঠাচ্ছেন, সেটা ঠিক আছে
  onClose,
}) {
  const [industry, setIndustry] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleSubmit = async (e) => {
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
        industry,
        employeeRange,
        logo: logoUrl,
        createdAt: new Date(),
      };

      console.log(companyData);
      toast.success("Company Registered Successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. open এর জায়গায় isOpen ব্যবহার করা হয়েছে
    // 2. onOpenChange এ onClose সরাসরি পাস করা হয়েছে অথবা (open) => !open ? onClose() : null করতে পারেন
    <Modal isOpen={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Modal.Backdrop />

      <Modal.Container placement="center">
        <Modal.Dialog className="w-full max-w-4xl bg-[#18181b] border border-[#27272a] text-white rounded-xl">

          <form onSubmit={handleSubmit}>

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
                    selectedKeys={industry ? new Set([industry]) : new Set()}
                    onSelectionChange={(keys) =>
                      setIndustry(Array.from(keys)[0] || "")
                    }
                  >
                    <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox className="bg-[#18181b] text-white">
                        <ListBox.Item id="Technology">Technology</ListBox.Item>
                        <ListBox.Item id="Healthcare">Healthcare</ListBox.Item>
                        <ListBox.Item id="Finance">Finance</ListBox.Item>
                        <ListBox.Item id="Education">Education</ListBox.Item>
                        <ListBox.Item id="Marketing">Marketing</ListBox.Item>
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
                    selectedKeys={employeeRange ? new Set([employeeRange]) : new Set()}
                    onSelectionChange={(keys) =>
                      setEmployeeRange(Array.from(keys)[0] || "")
                    }
                  >
                    <Select.Trigger className="bg-black border border-[#333333] h-11 rounded-lg">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="1-10 employees">1-10 employees</ListBox.Item>
                        <ListBox.Item id="11-50 employees">11-50 employees</ListBox.Item>
                        <ListBox.Item id="51-200 employees">51-200 employees</ListBox.Item>
                        <ListBox.Item id="201-500 employees">201-500 employees</ListBox.Item>
                        <ListBox.Item id="500+ employees">500+ employees</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setLogo(e.target.files?.[0] || null)
                    }
                    className="w-full text-white"
                  />
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
              {/* Cancel বাটনে ক্লিক করলে যেন মোডাল বন্ধ হয় তাই onPress এ onClose দেওয়া হয়েছে */}
              <Button
                variant="secondary"
                onPress={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={loading} // HeroUI তে সাধারণত 'isLoading' প্রপ কাজ করে, 'loading' নয়
              >
                Register Company
              </Button>
            </Modal.Footer>

          </form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}