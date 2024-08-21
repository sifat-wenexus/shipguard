import React, { useState } from 'react';

const PricingCard = () => {
  const [button, setButton] = useState(false);
  return (
    <>
      <div className="flex justify-center my-8">
        {/* <label class="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" value="" checked={true} class="peer sr-only" />
          <div class="peer flex h-12 items-center gap-4 text-black rounded-full bg-gray-100 px-4 py-4 after:absolute after:left-1 after: after:h-10 after:w-24 after:rounded-full after:bg-white/40  after:text-white after:transition-all after:content-[''] peer-checked:bg-red-300 peer-checked:text-black peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm">
            <span>Pay monthly</span>
            <span>pay yearly</span>
          </div>
        </label> */}

        <div
          className="rounded-full p-4 border-2 border-green-300 "
          onClick={() => setButton((p) => !p)}
        >
          <span
            className={`${'px-6 py-3 rounded-full  text-lg'} ${
              button ? 'bg-black text-white' : ''
            }`}
          >
            Pay monthly
          </span>
          <span
            className={`${'px-6 py-3 rounded-full  text-lg'} ${
              !button ? 'bg-black text-white' : ''
            }`}
          >
            Pay yearly
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 text-zinc-800 mt-10  w-full ml-4">
        <div className=" bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
          >
            <path
              fill-rule="evenodd"
              d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
            POPULAR
          </p>
          <div>
            <div className="flex gap-4 justify-center">
              <p className="font-extrabold text-3xl mb-2">Standard</p>
            </div>
            <p className="opacity-60 text-center">Standard plan for merchant</p>
            {/* <p className="opacity-60 text-center"></p> */}
            {/* <div className="flex gap-4 justify-center"> */}
            <div className="flex items-center justify-center my-8">
              <p className="font-extrabold text-4xl">$7.9</p>
              <p className="text-sm opacity-60 mt-2">/month</p>
            </div>
            {/* </div> */}
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Unlimited orders</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 ml-1 fill-orange-300"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Customized cart page widget</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Compatible with all store themes</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>VIP services experience</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{' '}
              24/7 Live Support
            </p>
            <div className="flex justify-center mt-8 ">
              <button className="w-full border py-3 rounded-full text-lg bg-black text-white hover:bg-gray-900">
                Start 14-day free trail
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 p-8 rounded-lg shadow-lg w-full ">
          <div>
            <h2 className="font-extrabold text-3xl text-center mb-2">Plus</h2>
            <p className="opacity-60 text-center">
              Plus plan for Shopify Plus merchants
            </p>
            <div className="flex items-center justify-center my-8">
              <p className="font-extrabold text-4xl">$79</p>
              <p className="text-sm opacity-60 mt-2">/month</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Unlimited orders & Revenues guarantee</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 ml-1 fill-orange-300"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Customized checkout page widget</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Customized cart page widget</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <b>Advanced customization & Integration</b>
            </p>
            <p className="flex items-center text-sm">
              <span className="p-2 m-2 border rounded-full bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{' '}
              Dedicated account manager
            </p>
            <div className="flex justify-center mt-8 ">
              <button className="w-full border py-3 rounded-full text-lg bg-gray-50 hover:bg-gray-100">
                Plus plan for plus merchant
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
