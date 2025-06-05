import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const WithoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 text-white lg:h-screen">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default WithoutLayout;
