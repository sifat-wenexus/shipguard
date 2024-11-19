import {Accordion, AccordionItem as Item} from '@szhsin/react-accordion';
import chevron from './components/chevron-down.svg';
import {Button, Page} from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <h1 className="text-[14px]">{header}</h1>
        <img
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter && 'rotate-180'
          }`}
          src={chevron}
          alt="Chevron"
        />
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-slate-100 ${
          isEnter && 'bg-slate-200'
        }`,
    }}
    contentProps={{
      className: 'transition-height duration-200 ease-out',
    }}
    panelProps={{ className: 'p-4' }}
  />
);


export default function Faqs() {
  const navigate = useNavigate();

  const faqs = [
    {
      header: "What is Overall Shipping Protection?",
      content: "Overall Shipping Protection is a customizable app that allows merchants to protect customer orders from loss, damage, or theft while managing claims directly through their dashboard.",
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
      header: "What makes Overall Shipping Protection unique?",
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
      <Page
        subtitle=""
        filterActions
        backAction={{ onAction: () => navigate(-1) }}
        title="Frequently Asked Questions"
      >
        <div className="mx-2 my-4 border-t bg-white ">
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
          <Accordion transition transitionTimeout={200}>
            {faqs.map((e,i)=>(
              <AccordionItem key={i} header={e.header}>
                {e.content}
              </AccordionItem>
            ))}

          </Accordion>
        </div>
      </Page>
  );
}
