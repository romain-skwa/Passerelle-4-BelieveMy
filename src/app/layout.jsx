import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Providers";
import "/src/app/styles/background.css";
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from "@/components/ForLayout/LanguageContext/LanguageContext";

export const metadata = {
  title: "This is my game",
  description: "Introduce your video game by yourself",
  keywords: 'video, game, introduction, creator, developer',
  authors: [{ name: 'Romain Delbos', url: 'https://romain-delbos.dev' }],
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.authors[0].name} />
        <meta property="og:title" content="This is my game" />
        <meta property="og:description" content="On this website, you may introduce your own video game" />
        <meta property="og:image" content="https://romain-delbos.dev/public/home/logoRomainDelbos.jpg" />
        <meta property="og:url" content="https://thisismygame.com" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@romain-delbos.dev" />
        <meta property="fb:app_id" content="app_id" />
        <meta property="og:site_name" content="romain-delbos.dev" />
        <meta property="og:image:alt" content="Logo de romain-delbos.dev" />
        <title>{metadata.title}</title>
      </head>
      <body className="small:bg-villeretroSmall laptop:bg-villeretro2">
          <AuthProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
