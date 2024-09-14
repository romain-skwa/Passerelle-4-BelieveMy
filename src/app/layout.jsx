import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Providers";

export const metadata = {
  title: "This is my game",
  description: "Introduce your video game by yourself",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className="bg-villeretro2">
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
