import NavBar from './landing-page/components/nav-bar';
import Banner from './landing-page/components/banner';
import HowItWorks from './landing-page/components/how-it-works';
import ShippingProtection from './landing-page/components/shipping-protection';
import Pricing from './landing-page/components/pricing';
import WidgetSetting from './landing-page/components/widget-setting';
import Smtp from './landing-page/components/smtp';
import ClaimsManagement from './landing-page/components/calim-management';
import ClaimProcess from './landing-page/components/claim-process';
import Overview from './landing-page/components/overview';
import FaQ from './landing-page/components/faq';
import Footer from './landing-page/components/footer';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Banner/>
      <HowItWorks/>
      <div className="w-[95%] sm:w-[80%] mx-auto">
        <ShippingProtection/>
        <Pricing/>
        <WidgetSetting/>
        <Smtp/>
        hello
        <ClaimsManagement/>
        <ClaimProcess/>
        <Overview/>
        <FaQ/>
      </div>
      <Footer/>
    </>
  );
};

export default LandingPage;
