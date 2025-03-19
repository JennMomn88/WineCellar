import React from 'react';

const CellarCard = ({ cellarName, bottlesCount, value, link }) => (
  <a
    href={link}
    className="transition-all duration-200 hover:bg-gray-100 bg-white shadow-sm border border-gray-200 rounded-xl p-0"
  >
    <div className="flex flex-row items-center">
      {/* Icon Section */}
      <div className="flex justify-center items-center bg-secondary text-white rounded-xl w-1/4 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path
            fill="currentColor"
            d="m12.15.85h-.3C6.95.85,2.97,4.83,2.97,9.72v13.43h18.06v-13.43c0-4.89-3.98-8.88-8.88-8.88Zm6.63,19.83H5.24v-2.47h13.55v2.47Zm0-3.51h-10.3v-1.51c0-.37.25-.67.56-.67h9.74v2.18Zm0-2.97h-7.64v-1.45c0-.23.14-.41.27-.41h7.37v1.86Zm0-2.6h-4.63v-1.46c0-.19.04-.33.08-.41h4.55v1.87Z"
          ></path>
        </svg>
      </div>

      <div className="w-3/4 px-4 py-3">
        <div className="flex justify-between mb-3">
          <div className="text-lg font-semibold truncate">{cellarName}</div>
          <div className="bg-gray-200 text-gray-700 text-xs uppercase font-semibold px-2 py-1 rounded-full">
            cellar
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <div className="font-semibold">
            <div className="text-sm text-gray-500">Bottles</div>
            <div>{bottlesCount}</div>
          </div>
          <div className="font-semibold text-right">
            <div className="text-sm text-gray-500">Value</div>
            <div>{value}</div>
          </div>
        </div>
      </div>
    </div>
  </a>
);

export default CellarCard;
