import "./globals.css";
import { DM_Sans } from "next/font/google"; 
const dm_sans = DM_Sans({ subsets: ['latin'], weight: ['500'] });

export const metadata = {
  title: "SpotiSearch",
  description: "A web app for discovering artists using Spotify and Ticketmaster data. Explore music, albums, and live events in one place!",
  icons: {
    icon: "/music-cloud-internet-svgrepo-com.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        {children}
      </body>
    </html>
  );
}
