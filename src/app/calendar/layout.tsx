import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Calendar",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
