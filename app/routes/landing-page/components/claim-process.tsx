import React from 'react';
import Header from '~/routes/landing-page/components/common/header';
import Subtitle from '~/routes/landing-page/components/common/subtitle';
import claimProcess from '../images/Claim Progress Image.png'
const ClaimProcess = () => {
  return (
    <div className="flex flex-col items-center py-8 my-8">
      {/* Title Section */}
      <Header text="  Claims Process" />
      <Subtitle text="Customers file claims in 4 clicks. We work seamlessly to make it easy." />

      <div>
        <img src={claimProcess} alt="claimProcess" />
      </div>

      {/* Grid of Images */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`Claims Process Step ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ClaimProcess;
