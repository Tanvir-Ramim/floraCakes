"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/card/tabs";
import {
  AlertTriangle,
  Calendar,
  Home,
  Package,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import OrderHistory from "@/components/account/order-history";
import OrderTracking from "@/components/account/order-tracking";
import ProfileSettings from "@/components/account/profile-settings";
import SecuritySettings from "@/components/account/security-settings";
import Container from "../shared/container/Container";
import ComplaintsSection from "./complaints-section";
import EventsSection from "./events-section";

const tabItems = [
  {
    value: "profile",
    label: "Profile",
    icon: User,
    component: <ProfileSettings />,
  },
  {
    value: "orders",
    label: "Orders",
    icon: Package,
    component: <OrderHistory />,
  },
  // {
  //   value: "tracking",
  //   label: "Tracking",
  //   icon: Home,
  //   component: <OrderTracking />,
  // },
  {
    value: "security",
    label: "Security",
    icon: ShieldCheck,
    component: <SecuritySettings />,
  },
  {
    value: "complain",
    label: "Complain",
    icon: AlertTriangle,
    component: <ComplaintsSection />,
  },
  {
    value: "events",
    label: "Events",
    icon: Calendar,
    component: <EventsSection />,
  },
];

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

 
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && tabItems.some((tab) => tab.value === hash)) {
      setActiveTab(hash);
    }

  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
   
  };

  return (
    <Container className=" p-4">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
     

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <div className="">
          {/* Sidebar */}
        
            <TabsList
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6  gap-2`}
            >
              
              {tabItems.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`flex items-center cursor-pointer gap-2 justify-center px-4 py-2 rounded ${
                    activeTab === value
                      ? "bg-author text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange(value)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
        

          {/* Main Content */}
          <div className="mt-32 md:mt-20">
            {tabItems.map(({ value, component }) => (
              <TabsContent
                key={value}
                value={value}
                className="p-4 border border-border-color shadow-md rounded-md"
              >
                {component}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </Container>
  );
}
