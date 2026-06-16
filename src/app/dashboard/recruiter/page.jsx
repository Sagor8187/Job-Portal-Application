import DashboardStatCard from "@/component/DashboardStatCard";

import { FaUsers, FaListAlt, FaCheckCircle, FaBolt } from "react-icons/fa";

export default function Page() {
  const statsData = [
    {
      id: 1,
      title: "Total Job Posts",
      value: 48,
      icon: FaListAlt,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: 1284,
      icon: FaUsers,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: 18,
      icon: FaBolt,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: 32,
      icon: FaCheckCircle,
    },
  ];

     return (
    <div className="p-6 w-full">
      <DashboardStatCard stats={statsData} />
    </div>
  );
} 