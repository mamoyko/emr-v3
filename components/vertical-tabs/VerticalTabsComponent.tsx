import React, { ReactNode, useEffect, useState } from "react";

import Loading from "@/app/loading";
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

interface VerticalTabsComponentProps {
  navigationList: any;
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
  handleNavigation,
  handleParentProcess,
  isLoading,
}: VerticalTabsComponentProps) => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const { routePathId } = UseRouting();
  const { height } = useWindowDimension();

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
      style={{ height: `${height - 280}px` }}
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
          style={{ height: `${height - 280}px` }}
        >
          <Card className="full-card">
            {(TitleComponent || DescriptionComponent) && (
              <CardHeader>
                {TitleComponent && <CardTitle>{TitleComponent}</CardTitle>}
                {DescriptionComponent && (
                  <CardDescription>{DescriptionComponent}</CardDescription>
                )}
              </CardHeader>
            )}
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loading />
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
