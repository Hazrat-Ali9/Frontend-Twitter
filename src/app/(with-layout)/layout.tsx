import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSide from "../components/LeftSide/page";
import RightSide from "../components/RightSide/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hazrat Ali",
  description: "Twitter",
};

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-8 grid-cols-1">
          <LeftSide />
          {children}
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default WithLayout;
