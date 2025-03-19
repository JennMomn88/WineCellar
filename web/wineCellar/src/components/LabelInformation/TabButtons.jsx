import React from 'react';

const TabButtons = ({ tabs, selectedTab, onTabClick }) => {
  return (
    <div className="flex gap-1 w-full mt-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={selectedTab === tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`transition-background duration-200 items-center justify-center text-center h-10 px-4 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent ${
            selectedTab === tab.key
              ? 'bg-black text-white hover:bg-neutral-600'
              : 'text-neutral hover:bg-base-200 active:bg-base-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <div className="w-full grow flex justify-end items-center">
        <a
          href="/cellar"
          className="flex flex-wrap text-sm items-center text-info hover:text-neutral-400 transition duration-300 font-medium gap-x-2"
        >
          See All
          <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="w-5">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TabButtons;
