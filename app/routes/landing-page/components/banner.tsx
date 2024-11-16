import { Link } from '@remix-run/react';
import React from 'react';

const Banner = () => {
  return (
    <main className="z-10 self-stretch mt-24 w-full max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col ">
        <div className={`sm:flex flex-col w-[33%] max-md:ml-0 max-md:w-full hidden`}>
          <img
            loading="lazy"
            src={'https://cdn.builder.io/api/v1/image/assets/TEMP/c8908a15ca6d4b8e3edd4bbf4a69c1d88f234825953eacea84d8a878baa6c4d8?placeholderIfAbsent=true&apiKey=fca9451cdb984bc3aa8c53ac42b0a519'}
            alt={'Shipping protection illustration'}
            className="object-contain self-stretch my-auto w-full aspect-[0.92] max-md:mt-7 max-md:max-w-full"
          />
        </div>
        <div className={`flex flex-col text-center ml-5 w-[33%] max-md:ml-0 max-md:w-full`}>
          <header className="flex z-10 flex-col items-center mt-24 mr-0 w-full max-md:mt-10 max-md:max-w-full p-4 sm:p-0">
            <h1 className="self-stretch text-3xl sm:text-5xl font-extrabold text-center sm:leading-[63px] text-stone-700 max-md:max-w-full">
              Secure Your Customers' Orders with Custom Shipping <span className="text-green-600">Protection</span>
            </h1>
            <p className="mt-4 text-base text-center text-zinc-800 max-md:max-w-full">
              Overall: Shipping Protection makes it easy for Shopify merchants to offer their own shipping protection fees, ensuring that customers' orders are safe from loss or damage during transit
            </p>
          </header>
          <div className="flex gap-4 my-11 max-w-full text-lg font-bold max-md:mt-10 items-center justify-center">
            <Link
              to={"https://shipping-protection.wenexus.io/auth/login"}
              target="_blank"
            >
              <button className="self-start px-6 py-1 text-white bg-green-600 rounded-xl shadow-[0px_11px_56px_rgba(255,172,55,0.15)] max-md:px-5 border-green-600 border-2 hover:bg-white hover:text-black">
                TRY FOR FREE
              </button>
            </Link>
            {/* <button className="rounded-xl px-6 py-1 border-2 border-green-600 border-solid shadow-[0px_11px_56px_rgba(255,172,55,0.15)] text-neutral-700 max-md:px-5 hover:bg-green-600 hover:text-white">
        GET THE APP
      </button> */}
          </div>
        </div>
        <div className={`sm:flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full hidden`}>
          <img
            loading="lazy"
            src={'https://cdn.builder.io/api/v1/image/assets/TEMP/d7dc650e555a94d5451a144cb2bdc171b433505a36b030a32e8fff9928a0a4b3?placeholderIfAbsent=true&apiKey=fca9451cdb984bc3aa8c53ac42b0a519'}
            alt={'Secure shipping visualization'}
            className="object-contain self-stretch my-auto w-full aspect-[0.92] max-md:mt-7 max-md:max-w-full"
          />
        </div>

      </div>
    </main>
  );
};

export default Banner;
