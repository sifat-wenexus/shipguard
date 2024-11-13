import Subtitle from '~/routes/landing-page/components/common/subtitle';
import Header from '~/routes/landing-page/components/common/header';
import pricing from '../images/procing.png'

const Pricing = () => {
  return (
    <div className="flex flex-col md:flex-row items-center ">
      <img src={pricing} alt="pricing" />
      <div className="md:w-2/6 text-center md:text-left my-8 md:mb-0 sm:ms-36">
        <Header text=" Flexible Protection Options" />
        <Subtitle
          text=" Merchants can offer percentage-based, fixed-price, or customized
          protection fees based on the order's value"
        />
      </div>
    </div>
  );
};

export default Pricing;
