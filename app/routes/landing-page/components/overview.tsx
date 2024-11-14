import Header from '~/routes/landing-page/components/common/header';
import overview from "../images/Report.png";

const Overview = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <Header
        text="Manage your claims, revenue, analyze data, and control every aspect of
        your shipping protection platform."
      />
      <div className="my-4 w-full sm:w-[70%]">
        <img src={overview} alt="overview" />
      </div>
    </div>
  );
};

export default Overview;
