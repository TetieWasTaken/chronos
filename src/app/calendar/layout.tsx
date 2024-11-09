import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Calendar",
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
