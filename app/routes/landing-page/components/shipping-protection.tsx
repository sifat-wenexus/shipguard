import gif from "../images/gif/preview-23.gif";

const ShippingProtection = () => {
  return (
    <div className="my-12">
      {/* <div className="flex justify-center mb-6">
        <img src={revenueImg} alt="revenueImg" className="hidden sm:block" />
      </div> */}
      {/* <h2 className="text-green-600 font-bold text-2xl md:text-4xl mb-8 text-center underline">
        Key Features
      </h2> */}
      <div className="hidden sm:block">
        <div className=" flex relative mx-auto ">
          <div className=" h-[600px] w-[70%] bg-[#3EAB3B] text-white p-6 flex items-center pl-8 rounded-2xl">
            <div className="w-[70%] ml-4">
              {" "}
              <h2 className="font-bold text-4xl mb-4 leading-tight">
                Boost Revenue and Build Trust with Shipping Protection
              </h2>
              <p className="text-lg  font-semibold">
                Easily enable or disable upsell features to offer flexible,
                tailored protection that meets your customers' needs. Drive
                additional revenue and build trust by providing coverage options
                that empower customers to secure their purchases against loss,
                damage, or theft.
              </p>
            </div>
          </div>
          <img
            src={gif}
            alt=""
            className=" border-red-400 rounded-3xl shadow-lg absolute right-0 top-12"
          />
        </div>
      </div>

      <div className="">
        {/* Right Image Section */}
        <div className=" ">
          <div className="rounded-lg overflow-hidden w-full sm:hidden block">
            <img
              src={gif}
              alt="Shipping Protection Card"
              className="w-full h-auto object-cover my-4 rounded-3xl shadow-lg"
            />
          </div>
        </div>
        {/* Left Text Section */}
        <div className="bg-[#3EAB3B] text-white p-6 rounded-2xl max-w-96 sm:hidden block text-center ">
          <h2 className="font-bold text-3xl mb-4 leading-tight">
            Increase Revenue And Trust With Shipping Protection
          </h2>
          <p className="text-lg  font-semibold">
            Sell your own insurance product in minutes that increases revenue
            and enhances customer experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingProtection;
