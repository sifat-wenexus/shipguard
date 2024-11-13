import shield from '../images/shield (1) 1.png'
import message from '../images/message 1.png'
import paper from '../images/claim 1.png'

const HowItWorks = () => {
  const steps = [
    {
      icon: shield,
      title: "Set Up Protection Fees",
      description:
        "Merchants can define their own shipping protection fees for customers to opt into during checkout.",
    },
    {
      icon: paper,
      title: "Manage Claims Easily",
      description:
        "Merchants can review customer claims and offer refunds, reship items, or approve other actions via a user-friendly dashboard.",
    },
    {
      icon: message,
      title: "Notify Customers via Email",
      description:
        "Automatic email notifications are sent to customers using Gmail OAuth 2.0, keeping them updated on their claim status.",
    },
  ];
  return (
    <div className="py-12 mb-6 px-4 flex flex-col items-center bg-gray-100">
      {/* Section Title */}
      <h2 className="text-green-600 font-bold text-2xl md:text-4xl mb-8 text-center">
        How It Works
      </h2>

      {/* Grid Layout for Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center space-y-4"
          >
            {/* Icon */}
            <img src={step.icon} alt={step.title} className="w-16 h-16" />

            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-900">
              {index + 1}. {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
