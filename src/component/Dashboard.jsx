import { getUserSession } from "@/lib/core/getSession";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Person,
  LayoutCellsLarge,
  Briefcase,
  Magnifier,
  Bookmark,
  FileText,
  CreditCard,
 
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function Dashboard() {
  const user = await getUserSession()

  const recruiternavItems = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    { icon: Bell, label: "Post Job", href: "/dashboard/recruiter/jobs/new" },
    {
      icon: Bell,
      label: "Company profile",
      href: "/dashboard/recruiter/company",
    },
    { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: Gear, label: "Settings", href: "/dashboard/settings" },
  ];

  const seekerNavItems = [
    { icon: LayoutCellsLarge, label: "Dashboard", href: "/dashboard/seeker" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/seeker/jobs" },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    { icon: CreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
    { icon: Gear, label: "Settings", href: "/dashboard/settings" },
  ];


   const adminNavItems = [
  { icon: LayoutCellsLarge, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Person, label: "Users", href: "/dashboard/admin/users" },
  { icon: House, label: "Companies", href: "/dashboard/admin/companies" },
  { icon: Briefcase, label: "Jobs", href: "/dashboard/admin/jobs" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/admin/payments" },
  { icon: Gear, label: "Settings", href: "/dashboard/settings"},
];
  
  const mapdashboard={
    seeker: seekerNavItems,
    recruiter :recruiternavItems,
    admin:adminNavItems
  }

  let navItems = mapdashboard[user?.role || "seeker"];


  const navside = (
    <nav className="flex flex-col gap-1 h-screen bg-black text-white p-4 w-64 border-r border-zinc-800">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href} // Points to the specific page path
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white transition-colors hover:bg-zinc-800"
        >
          <item.icon className="size-5 text-gray-400" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{navside}</div>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="md:hidden m-4" variant="secondary">
          <Bars />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="bg-black text-white h-screen"
          >
            <Drawer.Dialog className="bg-black text-white h-screen">
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-white">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="p-0">{navside}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
