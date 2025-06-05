import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
        <div className="flex justify-start items-center">
          <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
          <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
        </div>
        <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
      </div>
      <hr className="border-gray-600" />
      <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
        <div className="flex justify-start items-center">
          <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
          <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
        </div>
        <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
      </div>
      <hr className="border-gray-600" />
      <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
        <div className="flex justify-start items-center">
          <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
          <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
        </div>
        <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
      </div>
      <hr className="border-gray-600" />
      <div className="space-y-5 bg-slate-900 px-4 my-8 animate-pulse">
        <div className="flex justify-start items-center">
          <div className="h-10 w-10 rounded-full bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-2/6 ms-3 rounded-lg bg-rose-100/10 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
          <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
          <div className="h-3 w-2/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
        </div>
        <div className="h-72 rounded-lg bg-rose-100/10 animate-pulse"></div>
      </div>
      <hr className="border-gray-600" />
    </>
  );
};

export default Skeleton;
