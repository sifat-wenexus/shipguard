import { scrollToTopIcons } from '~/components/scroll-to-top-icons/scroll-to-top-icon';
import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { hsbToRgb, rgbaString } from '@shopify/polaris';
import { useEffect, useMemo, useState } from 'react';

const Preview = ({ formState }) => {
  const { state } = formState;
  const [move, setMove] = useState(0);

  const iconColorString = useMemo(
    () => rgbaString(hsbToRgb(state.iconColor)),
    [state.iconColor]
  );

  const SelectedIcon = useMemo(
    () => scrollToTopIcons.find((design) => design.id === state.selected)?.icon,
    [state.selected]
  );

  useEffect(() => {
    let parent: HTMLElement | null = document.getElementById('go-to-top');
    let button: any = document.getElementById('arrow-button');
    if (parent) {
      if (button) {
        button.style.display = move > 100 ? 'block' : 'none';
      }
    }
  }, [move]);

  const whileMove = (e) => {
    let parent: HTMLElement | null = document.getElementById('go-to-top');
    if (parent) {
      setMove(parent.children[0].scrollTop);
    }
  };

  const handleClickToTop = () => {
    let parent: HTMLElement | null = document.getElementById('go-to-top');
    if (parent) {
      parent.children[0].scrollTop = 0;
    }
    setMove(0);
  };

  return (
    <div className="relative mx-8" id="go-to-top " onWheel={whileMove}>
      <div className="border-8 border-gray-100 pb-8 rounded-3xl  h-[75vh] overflow-y-scroll  wenexus-mobile-scrollbar ">
        <div className="mx-4">
          <p
            className="bg-gray-200 rounded-xl text-center my-4 p-1 text-base"
            id="link"
          >
            wenexus.com/product-page
          </p>
          <div className="flex items-center justify-center">
            <div className=" bg-gray-200 h-[150px] w-[150px] border-8 border-gray-100 rounded-xl">
              <img
                src="https://honeybeeherb.com/cdn/shop/files/phoenix-star-blue-color-8-inch-dual-chamber-cylinder-top-recycler-dab-rig_720x.jpg?v=1716807283"
                alt="product image"
                id="product-image"
                className="block"
                height={'auto'}
                width={'100%'}
              />
            </div>
          </div>
          <h1 className="text-xl text-gray-500 px-2 font-semibold my-3 ">
            PHOENIX STAR 8 INCH DUAL CHAMBER
          </h1>
          <h1 className="text-lg text-gray-500 px-2 font-semibold my-3 ">
            <span className="font-normal line-through mr-3">$199.99</span>{' '}
            $99.99
          </h1>
          <div className="w-2/5 px-2">
            <div className="border border-gray-300 rounded grid grid-cols-3 text-center">
              <div className="text-xl font-semibold p-1">-</div>
              <div className="border border-gray-300 border-y-0 text-xl p-1 px-3">
                1
              </div>
              <div className="text-xl font-semibold p-1">+</div>
            </div>
          </div>
          <button className="bg-gray-950 text-gray-300 font-semibold text-base p-2 my-3 mx-2 rounded w-full hover:bg-black hover:text-gray-100 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-gray-300">
            Add to cart
          </button>
          <p className="my-3 mx-2 text-gray-500 text-base">
            Example product description
          </p>
          <p className="my-3 mx-2 text-gray-500 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of sheets containing Lorem Ipsum passages.
          </p>
        </div>
        <div
          className="h-8 w-8 rounded-md flex items-center justify-center absolute"
          id="arrow-button"
          style={{
            right:
              formState.state.right > 50
                ? formState.state.right - 13 + '%'
                : formState.state.right + 4 + '%',
            bottom: formState.state.bottom + '%',
          }}
        >
          {!SelectedIcon ? null : (
            <div onClick={handleClickToTop} className="p-1 cursor-pointer">
              <SelectedIcon
                bgColor={hsbaToHexWithAlpha(formState.staged.backgroundColor)}
                heightWidth={formState.staged.iconSize}
                color={iconColorString}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
