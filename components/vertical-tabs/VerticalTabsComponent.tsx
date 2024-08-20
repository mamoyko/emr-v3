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
import { ImageComponent } from "../helperComponent/ImageComponent";
import { ToolTipTextShow } from "../helperComponent/TextComponent";
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
      className="vertical-tabs-container"
      style={{ height: !height ? "100%" : `${height - 280}px` }}
    >
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="vertical-tabs"
      >
        <TabsList
          className="vertical-tab-list"
          style={{ height: `${height - 280}px` }}
        >
          {TabHeaderComponent}
          {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => (
            <TabsTrigger
              key={navItem.value}
              value={navItem.value}
              className={`vertical-tab-trigger ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              <span>{navItem.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          className="vertical-tab-content"
          value={currentTab}
          style={{ height: `${height - 295}px` }}
        >
          <Card className="full-card">
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
                style={{ height: `${height - 400}px` }}
              >
                <CustomLoading height={height} toDivide={2.5} />
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
