import React from "react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <div>
      <section className="w-full py-6 md:py-12 rounded-lg shadow-md">
        <div className="container flex flex-col items-center gap-4 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Your safety is our top priority.
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We are dedicated to providing a secure environment for all our
              users. Learn more about our security measures and privacy
              policies.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="/home"
            >
              Stay Safe
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              to="/home"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
