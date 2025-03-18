import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
