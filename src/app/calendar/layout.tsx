import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Calendar",
  keywords: ["Chronos", "Calendar"],
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
