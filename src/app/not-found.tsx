import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="text-center text-red-600">
      <h1 className="text-4xl font-semibold">404</h1>
      <h3 className="text-2xl">Page Not Found</h3>
      <Link href="/">
        <button className="my-10 bg-blue-800 text-white py-2 px-4 rounded-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
