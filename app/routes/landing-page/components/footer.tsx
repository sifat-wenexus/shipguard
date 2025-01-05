import { Link } from '@remix-run/react';

const Footer = () => {
  return (
    <>
      {" "}
      <div className="text-center text-white p-4 bg-gray-800 h-[350px] pt-16">
        {/* <div className="overlay"></div> */}
        <div className="">
          <h2 className="text-4xl font-bold my-4">
            Start Protecting Your Shipments Today!
          </h2>
          <p>
            Provide your customers with peace of mind while generating
            additional revenue for your business.
          </p>
          <div className=" flex gap-4 my-11 max-w-full text-lg font-bold max-md:mt-10 items-center justify-center">
            <Link
              to="https://shipguard.app/auth/login"
              target="_blank"
            >
              <button className="self-start px-6 py-1 text-white bg-green-600 rounded-xl shadow-[0px_11px_56px_rgba(255,172,55,0.15)] max-md:px-5 border-green-600 border-2 hover:bg-white hover:text-black">
                TRY FOR FREE
              </button>
            </Link>
            {/* <button className="rounded-xl px-6 py-1 border-2 border-green-600 border-solid shadow-[0px_11px_56px_rgba(255,172,55,0.15)] text-white max-md:px-5 hover:bg-green-600 hover:text-white">
              GET THE APP
            </button> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-white text-center p-4">
        <p>
          2024 ShipGuard: Shipping Protection |{" "}
          <Link
            to="https://shipguard.app/terms-of-service"
            target="_blank"
          >
            {" "}
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link
            to="https://shipguard.app/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
