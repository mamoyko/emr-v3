import React, { ReactNode, useState } from "react";

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
import useWindowHeight from "../helperFunctions/useWindowHeight";

interface VerticalTabsComponentProps {
  navigationList: any;
  ContentComponent: ReactNode;
  FooterComponent: ReactNode;
  defaultValue: string;
  handleNavigation: (value: string) => void;
  TitleComponent: ReactNode;
  DescriptionComponent: ReactNode;
  handleParentProcess: () => void;
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
}: VerticalTabsComponentProps) => {
  const [currentTab, setCurrentTab] = useState(defaultValue);
  const { routePathId } = UseRouting();
  const height = useWindowHeight();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    routePathId("active", value);
    handleNavigation(value);
    handleParentProcess();
  };

  const MEMOIZE_NAV = Array.isArray(navigationList)
    ? [...navigationList]
    : [...FNObjectLevelOneToArray({ toTransformData: navigationList })];

  return (
    <div
      className="vertical-tabs-container"
      style={{ height: `${height - 200}px` }}
    >
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="vertical-tabs"
      >
        <TabsList
          className="vertical-tab-list"
          style={{ height: `${height - 200}px` }}
        >
          {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => (
            <TabsTrigger
              key={navItem.value}
              value={navItem.value}
              className="vertical-tab-trigger"
            >
              <span>{navItem.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          className="vertical-tab-content"
          value={currentTab}
          style={{ height: `${height - 200}px` }}
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
            <CardContent className="space-y-2">{ContentComponent}</CardContent>
            {FooterComponent && <CardFooter>{FooterComponent}</CardFooter>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VerticalTabsComponent;
