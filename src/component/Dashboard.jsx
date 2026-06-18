import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function Dashboard() {
const navItems = [
  { icon: House, label: "Home", href: "/" },
  { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
  { icon: Bell, label: "Create a Job", href: "/dashboard/recruiter/jobs/new" },
  { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
  { icon: Person, label: "Profile", href: "/dashboard/profile" },
  { icon: Gear, label: "Settings", href: "/dashboard/settings" },
];

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
      <div className="hidden md:block">
        {navside}
      </div>

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

              <Drawer.Body className="p-0">
                {navside}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}