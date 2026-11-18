import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppointmentProvider } from "@/context/AppointmentContext";

export const metadata = {
  title: "Medslot | Clinic Management System",
  description: "Smart clinic appointment and patient management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppointmentProvider>
            {children}
          </AppointmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}