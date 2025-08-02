import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Providers";
import "/src/app/styles/background.css";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      
      <body className="small:bg-villeretroSmall laptop:bg-villeretro2">
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
