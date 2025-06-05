import Link from "next/link";

const WorkingPage = () => {
  return (
    <div>
      <div className="flex justify-center text-slate-300 items-center h-[calc(100vh-68px)]">
        <p className="text-7xl font-thin">W</p>
        <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin mt-5 border-blue-600"></div>
        <p className="text-7xl font-thin">rking on this service...</p>
      </div>
      <div>
        <p>Wait for next update...</p>
      </div>
      <Link href="/">
        <button className="py-2 px-3 bg-blue-600 text-slate-50">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default WorkingPage;
