import { Accordion } from "rsuite";
const FaQ = () => {
  const items = [
    {
      header: "What is ShipGuard Shipping Protection?",
      content: "ShipGuard Shipping Protection is a customizable app that allows merchants to protect customer orders from loss, damage, or theft while managing claims directly through their dashboard.",
    },
    {
      header: "How do I enable shipping protection for my store?",
      content: "Install the app, configure your protection fees, and activate the widget for your checkout or cart pages. The process is quick and seamless.",
    },
    {
      header: "What coverage options are available?",
      content: "You can offer percentage-based, fixed-price, or custom fees for shipping protection. Tailor coverage to meet your store’s needs.",
    },
    {
      header: "Can I exclude certain products or variants from protection?",
      content: "Yes, you can set exclusions for specific products or variants directly in the app settings.",
    },
    {
      header: "How does the claims process work?",
      content: "Customers can submit claims through a simple portal. Merchants can review claims, approve refunds, issue reshipments, or offer other resolutions—all managed in the app.",
    },
    {
      header: "What happens if I uninstall the app?",
      content: "Uninstalling the app removes the widget and associated protection products from your store. No code will be left behind.",
    },
    {
      header: "Does the app support Shopify Plus checkout?",
      content: "Yes, the app is fully compatible with Shopify Plus, ensuring a seamless integration into advanced checkout flows.",
    },
    {
      header: "How is digital insurance fulfilled?",
      content: "You can choose to mark insurance as fulfilled immediately, after the first item ships, or when all items are fulfilled.",
    },
    {
      header: "Does the app provide analytics or reports?",
      content: "Yes, the app offers insights into claims, protection revenue, and performance metrics via a real-time dashboard.",
    },{
      header: "What are automated claims workflows?",
      content: "The app allows you to automate actions like refunds, reshipments, and customer notifications, simplifying claims management.",
    },{
      header: "Are automated email notifications supported?",
      content: "Yes, the app integrates with Gmail OAuth 2.0 or custom SMTP to send real-time updates to customers for claims and fulfillment.",
    },{
      header: "What makes ShipGuard Shipping Protection unique?",
      content: "Unlike third-party solutions, this app routes premiums directly to you, helping you retain more control and revenue while delivering peace of mind to your customers. ",
    },{
      header: "Does it work for international orders?",
      content: "Yes, the app supports shipping protection for both domestic and international orders. ",
    },{
      header: "What kind of support is available?",
      content: "Our team offers 24/7 customer support to assist with installation, setup, and troubleshooting. ",
    },{
      header: "Does the app modify my store's theme code?",
      content: "No, the app does not alter your store's theme code, ensuring no interference with your design or functionality. ",
    },{
      header: "How can I track performance?",
      content: "Use the built-in dashboard to view claims overview, revenue analytics, and customer behavior, helping you make data-driven decisions. ",
    },
  ];
  return (
    <div className="text-center my-8">
      <h2 className="text-green-600 font-bold text-2xl md:text-3xl mb-2">
        Frequently Asked Questions
      </h2>
      {/* <div className="min-w-full bg-gray-100 py-6">
        <h2 className="font-bold text-xl md:text-2xl mb-2">
          What is the Benefit of Navidium?
        </h2>
        <div className="flex justify-center">
          <p className="w-2/3 text-left ">
            With the rising cost of shipping those few orders a month that get
            "lost" have slowly become more and more expensive. Navidium gives
            you a tool to help off-set that cost by allowing you to charge a
            small fee from your customers in exchange for a shipping delivery
            guarantee.
          </p>
        </div>
      </div> */}
      {/* accordion  */}
      <div className="w-[95vw] sm:w-[50vw] m-auto">
        <Accordion>
          {items.map((item, index) => (
            <Accordion.Panel key={index} header={item.header}>
              <p className="text-start">{item.content}</p>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaQ;

// import React from 'react';
//
// const FaQ = () => {
//   return <></>;
// };
//
// export default FaQ;
