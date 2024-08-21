const ProductCard = ({ card }) => {
  return (
    <div className="bg-blue-100 rounded flex items-center justify-between m-2.5 ">
      <div className="flex items-center">
        {' '}
        {card === 1 && (
          <img
            src="https://resources.claroshop.com/medios-plazavip/mkt/64934bef38b8f_iphone-14-plus-starlight_2jpg.jpg"
            className="border border-blue-100 rounded"
            height={80}
            width={80}
            alt=""
          />
        )}
        {card === 2 && (
          <img
            src="https://www.info-computer.com/180153-large_default/smartphone-apple-iphone-14-plus-67-256gb-oled-wifi-5g-usb-azul-ksolapeqw.jpg"
            className="border border-blue-100 rounded "
            height={80}
            width={80}
            alt=""
          />
        )}
        <div className="ml-4">
          <p className="font-semibold text-base ">Phone MS</p>
          <p className="text-gray-400">$400.00</p>
        </div>{' '}
      </div>
      <span className="px-1.5 rounded border border-gray-600 mr-4 text-sm font-semibold cursor-pointer hover:bg-blue-200 ">
        1
      </span>
    </div>
  );
};

export default ProductCard;
