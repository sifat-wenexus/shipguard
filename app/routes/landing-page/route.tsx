import ShippingProtection from '~/routes/landing-page/components/shipping-protection';
import ClaimsManagement from '~/routes/landing-page/components/calim-management';
import WidgetSetting from '~/routes/landing-page/components/widget-setting';
import ClaimProcess from '~/routes/landing-page/components/claim-process';
import HowItWorks from '~/routes/landing-page/components/how-it-works';
import Overview from '~/routes/landing-page/components/overview';
import Pricing from '~/routes/landing-page/components/pricing';
import NavBar from '~/routes/landing-page/components/nav-bar';
import Footer from '~/routes/landing-page/components/footer';
import Banner from '~/routes/landing-page/components/banner';
import Smtp from '~/routes/landing-page/components/smtp';
import FaQ from '~/routes/landing-page/components/faq';

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
