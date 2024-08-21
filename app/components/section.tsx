import * as Icons from '@shopify/polaris-icons';
import { Button, Icon } from '@shopify/polaris';
import type { FC } from 'react';
import { useState } from 'react';
import { ChevronRightIcon } from '@shopify/polaris-icons';

export const Section: FC<SectionProps> = ({ title, desc, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white rounded-md p-6 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex">
          <div
            className="cursor-pointer p-1 rounded-md border hover:bg-gray-200"
            onClick={prevItem}
          >
            <Icon source={Icons.ChevronLeftIcon} />
          </div>
          <div
            className="cursor-pointer p-1 rounded-md border hover:bg-gray-200"
            onClick={nextItem}
          >
            <Icon source={ChevronRightIcon} />
          </div>
        </div>
      </div>
      <p className="mb-2">{desc}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {items.slice(currentIndex, currentIndex + 2).map((item, index) => (
          <div
            key={index}
            className="flex-1 gap-2 border rounded-md p-4 shadow-sm"
          >
            <div className="flex">
              <div className="mr-2 mt-[1px]">
                <Icon source={item.icon} />
              </div>
              <div className="gap-2">
                <h2 className=" text-blue-500 font-bold mb-2">{item.title}</h2>
                <p className="mb-2">{item.content}</p>
                <Button url={item.url}>Explore</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface SectionProps {
  title: string;
  desc: string;
  items: Item[];
}

interface Item {
  url?: string;
  title: string;
  icon: any;
  content: string;
}
