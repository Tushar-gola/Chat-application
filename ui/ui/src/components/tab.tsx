import { cx } from "class-variance-authority";
import { ReactNode } from "react";

type TabButtonProps = {
  title: string;
  onClick: () => void;
  isActive: boolean;
};

export const TabButton = ({ title, onClick, isActive }: TabButtonProps) => {
  return (
    <button
      className={cx("relative flex justify-center items-center px-2", isActive ? "text-teal-600" : "text-gray-600")}
      onClick={onClick}
    >
      {isActive && <div className={cx("absolute -bottom-[2px] rounded-md h-[2px] w-full bg-teal-600")} />}
      <span className="z-10">{title}</span>
    </button>
  );
};

type TabsProps = {
  tabs: string[] | readonly string[];
  activeTab: string | null;
  onTabChange: (tab: string) => void;
};

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="h-8 flex px-2 gap-2 border-b-2 border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return <TabButton key={tab} title={tab} onClick={() => onTabChange(tab)} isActive={isActive} />;
      })}
    </div>
  );
};

type TabLayoutProps = {
  children: ReactNode;

  contentClassName?: string;
};
type TabLayoutWithFeedProps = {
  feedIsOpen?: boolean;
  setFeedIsOpen?: () => void;
  feed: ReactNode;
} & TabLayoutProps;

export const TabLayout = ({ children, contentClassName }: TabLayoutProps) => {
  return (
    <div className="h-full grid p-2 bg-gray-100 gap-2 overflow-auto">
      <div className={cx("bg-white rounded-xl border-2 border-gray-200 w-[calc(100vw_-_16px)]", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
export const TabLayoutContainer = ({ children, feed, feedIsOpen }: TabLayoutWithFeedProps) => {
  return (
    <div
      className={cx(
        "grid transition-all duration-200 p-1 bg-gray-100 gap-2 h-full",
        feedIsOpen ? "grid-cols-[1fr_400px]" : "grid-cols-[1fr_40px]"
      )}
    >
      {children}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-auto w-full">{feed}</div>
    </div>
  );
};
export const TabLayoutWithFilterContainer = ({ children, feed, feedIsOpen }: TabLayoutWithFeedProps) => {
  return (
    <div
      className={cx(
        "grid transition-all duration-200 p-2 bg-gray-100 gap-1 h-full",
        feedIsOpen ? "grid-cols-[320px_1fr]" : "grid-cols-[0px_1fr]"
      )}
    >
      <div className="bg-white  border-2 border-gray-200  overflow-auto w-full rounded-md">{feed}</div>
      {children}
    </div>
  );
};
export const TabLayoutItem = ({ children }: TabLayoutProps) => {
  return <div className="bg-white rounded-xl border-[1px] border-gray-200 h-full overflow-hidden">{children}</div>;
};
