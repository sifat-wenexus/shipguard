import React, { useState } from 'react';

const PricingCard = () => {
  const [button, setButton] = useState(false);

  const standardList = [
    'Unlimited orders',
    'Customized cart page widget',
    'Compatible with all store themes',
    'VIP services experience',
    '24/7 Live support',
  ];

  const plusList = [
    'Unlimited orders & Revenues guarantee',
    'Customized checkout page widget',
    'Customized cart page widget',
    'Advanced customization & Integration',
    'Dedicated account manager',
  ];
  return (
    <>
      <div className="flex justify-center my-8">
        <div
          className="rounded-full p-2 border-2 border-green-300 "
          onClick={() => setButton((p) => !p)}
        >
          <span
            className={`${'px-4 py-2 rounded-full text-sm sm:text-lg'} ${
              button ? 'bg-black text-white translate-x-full' : 'translate-x-0'
            }`}
          >
            Pay monthly
          </span>
          <span
            className={`${'px-4 py-2 rounded-full text-sm sm:text-lg'} ${
              !button
                ? 'bg-black text-white -translate-x-full'
                : 'translate-x-0'
            }`}
          >
            Pay yearly (Save 30%)
          </span>
        </div>
      </div>

      <div className="sm:flex sm:justify-center sm:space-x-8 m-2 sm:m-0 mb-12 w-full">
        {/* <!-- Standard Plan --> */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:ml-4 my-3 sm:my-0 relative">
          <div className="absolute left-[40%] -top-3">
            <p className="text-sm font-medium text-black border rounded-lg px-3 p-1 bg-gradient-to-r from-amber-500 to-pink-500">
              Most popular
            </p>
          </div>
          <h2 className="text-2xl font-semibold mt-2">Standard</h2>
          <p className="text-gray-500 text-sm">
            Standard plan for all merchants
          </p>
          <p className="text-5xl font-bold mt-4">
            $8.25<span className="text-lg text-gray-500">/Month</span>
          </p>
          <ul className="mt-6 space-y-2">
            {standardList.map((e, i) => (
              <li key={i} className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-6">
            Start 14-day free trial
          </button>
        </div>

        {/* <!-- Plus Plan --> */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
          {' '}
          <br />
          <h2 className="text-2xl font-semibold mt-2">Plus</h2>
          <p className="text-gray-500 text-sm">
            Plus plan for Shopify Plus merchants
          </p>
          <p className="text-5xl font-bold mt-4">
            $36.75
            <span className="text-lg  text-gray-500">/Month</span>
          </p>
          <ul className="mt-6 space-y-2">
            {plusList.map((e, i) => (
              <li key={i} className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-gray-200 text-gray-500 font-semibold py-3 rounded-lg mt-6 cursor-not-allowed">
            Plus plan for plus merchant
          </button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
