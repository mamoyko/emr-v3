import React, { ReactNode, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./VerticalTabs.css";
import { FNObjectLevelOneToArray } from "../helperFunctions/TransformObjectToArray";
import UseRouting from "../helperFunctions/UseRouting";
import useWindowDimension from "../helperFunctions/useWindowDimension";
import { CustomLoading } from "../Loader";

interface VerticalTabsComponentProps {
  navigationList: any;
  TabHeaderComponent: ReactNode;
  ContentComponent: ReactNode;
  FooterComponent: ReactNode;
  defaultValue: string;
  handleNavigation: (value: string) => void;
  TitleComponent: ReactNode;
  DescriptionComponent: ReactNode;
  handleParentProcess: () => void;
  isLoading: boolean;
  verticalTabHeightControl: number;
}

const VerticalTabsComponent = ({
  navigationList,
  ContentComponent,
  defaultValue,
  TitleComponent,
  FooterComponent,
  DescriptionComponent,
  TabHeaderComponent,
  handleNavigation,
  handleParentProcess,
  isLoading,
  verticalTabHeightControl,
}: VerticalTabsComponentProps) => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const { routePathId } = UseRouting();
  const { height, width } = useWindowDimension();

  const handleTabChange = (value: string) => {
    if (!isLoading) {
      setCurrentTab(value);
      routePathId("active", value);
      handleNavigation(value);
      handleParentProcess();
    }
  };

  const MEMOIZE_NAV = Array.isArray(navigationList)
    ? [...navigationList]
    : [...FNObjectLevelOneToArray({ toTransformData: navigationList })];

  useEffect(() => {
    handleTabChange(defaultValue);
  }, []);

  if (!height) return;
  return (
    <div
      className="flex items-center justify-center rounded-xl bg-slate-800 p-5 md:p-0"
      style={{
        height: !height
          ? "100%"
          : `${height - 280 - verticalTabHeightControl}px`,
        border: "1px solid black",
      }}
    >
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="flex w-full flex-col md:flex-row"
        style={{
          height: !height
            ? "100%"
            : `${height - 285 - verticalTabHeightControl}px`,
        }}
      >
        <TabsList className=" flex size-full flex-row items-start overflow-y-auto md:w-[250px] md:flex-col">
          {TabHeaderComponent}
          <div>
            {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => (
              <TabsTrigger
                key={navItem.value}
                value={navItem.value}
                className={`w-full cursor-pointer bg-transparent py-2.5 text-left transition-colors duration-200 ease-in-out hover:bg-gray-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isLoading}
              >
                <span>{navItem.title}</span>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        <TabsContent
          className="flex grow flex-col items-start overflow-y-auto px-1"
          value={currentTab}
          style={{
            height: !height
              ? "100%"
              : `${height - 300 - verticalTabHeightControl}px`,
          }}
        >
          <Card className="flex size-full flex-col overflow-y-auto">
            {(TitleComponent || DescriptionComponent) && (
              <CardHeader className="sticky top-0 z-10 bg-inherit shadow-md">
                {TitleComponent && <CardTitle>{TitleComponent}</CardTitle>}
                {DescriptionComponent && (
                  <CardDescription>{DescriptionComponent}</CardDescription>
                )}
              </CardHeader>
            )}
            {isLoading ? (
              <div
                className="flex h-full items-center justify-center"
                style={{
                  height: !height
                    ? "100%"
                    : `${height - 400 - verticalTabHeightControl}px`,
                }}
              >
                <CustomLoading
                  height={height - verticalTabHeightControl}
                  toDivide={2.5}
                />
              </div>
            ) : (
              <CardContent className="space-y-2">
                {ContentComponent}
              </CardContent>
            )}
            {FooterComponent && <CardFooter>{FooterComponent}</CardFooter>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VerticalTabsComponent;
