import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";


export const metadata = {
  title: "This is my game",
  description: "Introduce your video game by yourself",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-slate-400 flex flex-col h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
