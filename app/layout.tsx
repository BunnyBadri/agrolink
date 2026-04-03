import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "AgroLink",
  description: "Farmer Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}