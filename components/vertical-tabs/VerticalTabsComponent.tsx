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
    <div className="w-full grow-0">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="vertical-tabs"
      >
        <TabsList className="vertical-tab-list flex flex-col items-start ">
          {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => {
            return (
              <div key={navItem.title} className="flex w-full overflow-x-auto">
                <TabsTrigger
                  key={navItem.value}
                  value={navItem.value}
                  className="w-full text-left"
                >
                  <span>{navItem.title}</span>
                </TabsTrigger>
              </div>
            );
          })}
        </TabsList>

        <div className="vertical-tab-content">
          <TabsContent value={currentTab}>
            <Card className="full-card">
              {(TitleComponent || DescriptionComponent) && (
                <CardHeader>
                  {TitleComponent && <CardTitle>{TitleComponent}</CardTitle>}
                  {DescriptionComponent && (
                    <CardDescription>{DescriptionComponent}</CardDescription>
                  )}
                </CardHeader>
              )}
              <CardContent className="space-y-2">
                {ContentComponent}
              </CardContent>
              {FooterComponent && <CardFooter>{FooterComponent}</CardFooter>}
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default VerticalTabsComponent;
