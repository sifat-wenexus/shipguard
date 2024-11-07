import widget from "../images/background.png";
import widgetGif from "../images/gif/widget setting.gif";
import claimRequest from "../images/gif/shipping-protection 3.gif";
import Header from '~/routes/landing-page/components/common/header';
import Subtitle from '~/routes/landing-page/components/common/subtitle';

const ClaimsManagement = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 my-12">
      {/* right Image Section */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 sm:hidden">
        <div className="relative">
          {/* iMac Image */}
          <img
            src={widget} // Replace with your actual image URL
            alt="Widget Settings Preview"
            // className="max-w-xs md:max-w-md rounded-lg "
          />
          <img
            src={widgetGif}
            alt="widgetGif"
            className="absolute z-10 top-[48%] translate-y-[-50%]  left-[50%] translate-x-[-50%] overflow-hidden sm:w-[89%] sm:h-[52%] rounded-xl"
          />
        </div>
      </div>
      {/* left Text Section */}
      <div className="md:w-2/6 text-center md:text-left ms-3">
        <Header text="  Fully integrated and seamless claims management system" />
        <Subtitle
          text="Our claim request form and dashboard make it easy to manage and
          resolve customer claims in one place."
        />
      </div>
      {/* right Image Section */}
      <div className="md:w-1/2 sm:flex justify-center mb-8 md:mb-0 hidden">
        <div className="relative">
          {/* iMac Image */}
          <img
            src={widget} // Replace with your actual image URL
            alt="Widget Settings Preview"
            // className=" rounded-2xl shadow-xl "
          />
          <img
            src={claimRequest}
            alt="widgetGif"
            className="absolute z-10 top-[48%] translate-y-[-50%]  left-[45%] translate-x-[-50%] overflow-hidden shadow-xl rounded-2xl w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimsManagement;
