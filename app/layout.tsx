import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptopia app",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
