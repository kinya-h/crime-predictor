import React, { useState } from "react";
import CrimePredictionForm from "../components/CrimePredictionForm";
import CrimeLineChart from "../components/ScatterPlot";

const Home = () => {
  const [prediction, setPredictions] = useState("");
  const displayPredictions = (preds: any) => {
    setPredictions(preds);
  };
  return (
    <div>
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Predict. Prevent. Protect.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Empowering communities with actionable insights. Our AI-powered
              platform delivers real-time crime predictions and tools for
              proactive intervention. Stay ahead of the curve. Stay safe.
            </p>
          </div>
          <div className="mx-auto max-w-[600px] space-y-4">
            <form className="mx-auto rounded-lg  bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="grid w-full grid-cols-2 items-stretch px-4 gap-2">
                <input
                  className="grid focus:outline-0 w-full text-sm placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="h-[44px] w-full text-sm" type="submit">
                  Subscribe
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 text-center dark:text-gray-400">
              Sign up to receive updates on our official launch.
            </p>
          </div>
        </div>
        <CrimePredictionForm onPredictions={displayPredictions} />

        {prediction && (
          <h1 className="text-3xl text-blue-600 font-bold">
            {" "}
            Predicted Results for this location input and time series data is :{" "}
            {prediction}
          </h1>
        )}
      </section>

      <CrimeLineChart />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How it Works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform leverages advanced algorithms and data analysis to
              provide accurate crime predictions. Here's a glimpse into the
              process.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="space-y-2">
              <div className="inline-flex h-10 items-center rounded-full border  border-gray-200 bg-gray-950 p-3 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Data Collection</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Law enforcement agencies and public safety organizations
                  provide incident reports and data.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="inline-flex h-10 items-center rounded-full border  border-gray-200 bg-gray-950 p-3 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Data Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our machine learning models process the data, identifying
                  patterns and risk factors.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="inline-flex h-10 items-center rounded-full border border-gray-200 border-gray-200 bg-gray-200 p-3 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-200 dark:text-gray-50">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Real-time Alerts</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Users receive notifications and insights, enabling them to
                  take proactive measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Experience the tools that put safety in your hands. Our intuitive
              platform offers a range of features designed to keep you informed
              and secure.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Real-time Crime Alerts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive instant notifications about incidents in your area.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
                Personalized Safety Recommendations
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Access tailored tips to enhance your security based on your
                location and lifestyle.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Community Engagement Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect with neighbors, share information, and collaborate to
                create safer environments.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Real-time Crime Alerts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive instant notifications about incidents in your area.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
                Personalized Safety Recommendations
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Access tailored tips to enhance your security based on your
                location and lifestyle.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Community Engagement Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect with neighbors, share information, and collaborate to
                create safer environments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
