import React from 'react';
import Header from '~/routes/landing-page/components/common/header';
import Subtitle from '~/routes/landing-page/components/common/subtitle';
import pricing from '../images/smtp-1-jpg-removebg-preview 1.png'

const Smtp = () => {
  return (
    <div className="flex flex-col md:flex-row items-center ">
      <div className="text-center">
        <img src={pricing} alt="pricing" className="w-full sm:w-[80%]" />
      </div>
      <div className="md:w-2/6 text-center md:text-left my-8 md:mb-0 sm:ms:2">
        <Header text=" Automated Email Notifications" />
        <Subtitle
          text=" Integrated with Gmail OAuth 2.0, merchants can automatically send
        customized email updates to customers."
        />
      </div>
    </div>
  );
};

export default Smtp;
