import NavBar from '~/routes/landing-page/components/nav-bar';
import Banner from '~/routes/landing-page/components/banner';
import HowItWorks from '~/routes/landing-page/components/how-it-works';
import ShippingProtection from '~/routes/landing-page/components/shipping-protection';
import Pricing from '~/routes/landing-page/components/pricing';
import WidgetSetting from '~/routes/landing-page/components/widget-setting';
import Smtp from '~/routes/landing-page/components/smtp';
import ClaimsManagement from '~/routes/landing-page/components/calim-management';
import ClaimProcess from '~/routes/landing-page/components/claim-process';
import Overview from '~/routes/landing-page/components/overview';
import FaQ from '~/routes/landing-page/components/faq';
import Footer from '~/routes/landing-page/components/footer';

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
