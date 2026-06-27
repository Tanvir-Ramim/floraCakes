import AccountDashboard from "@/components/account/account-dashboard";
import Container from "@/components/shared/container/Container";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account Dashboard | Cake Shop",
  description: "Manage your account, track orders, and update your information",
};
const AcountPage = () => {
  // In a real app, you would check if the user is authenticated
  const isAuthenticated = true;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="mt-10 lg:mt-20 relative">
      <Container className="">
        <AccountDashboard />
      </Container>
    </div>
  );
};

export default AcountPage;
