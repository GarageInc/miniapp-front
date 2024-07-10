import cx from "classnames";
import React, { useState } from "react";

import { Button, ButtonProps } from "@/shared/ui/forms";

type TabsProps = {
  children: React.ReactElement<TabItemProps>[];
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setCurrentTabIndex(index);
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: (event) => {
          child.props.onClick?.(event);
          if (event.isDefaultPrevented()) return;
          handleTabChange(index);
        },
        isActive: currentTabIndex === index,
      } satisfies Partial<TabItemProps>);
    }
    return child;
  });

  const activeTabContent = React.isValidElement(children[currentTabIndex])
    ? children[currentTabIndex].props.content
    : null;

  return (
    <div className={cx("flex flex-col", className)}>
      <div className="flex space-x-4 shrink-0">{childrenWithProps}</div>
      <TabContent className="flex-1">{activeTabContent}</TabContent>
    </div>
  );
};

type TabItemProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  isActive?: boolean;
} & Omit<ButtonProps, "content">;

export const TabItem: React.FC<TabItemProps> = ({
  children,
  onClick,
  isActive,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={`px-4 py-2 flex-1 rounded-[8px] cursor-pointer text-white text-center font-display font-medium`}
      color={isActive ? "purple" : "gray"}
      active={isActive}
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
};

type TabContentProps = {
  children: React.ReactNode;
  className?: string;
};

const TabContent: React.FC<TabContentProps> = ({ children, className }) => {
  return <div className={cx("mt-4", className)}>{children}</div>;
};
