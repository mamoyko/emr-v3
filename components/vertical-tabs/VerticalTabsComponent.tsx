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
import UseRouting from "../helperFunctions/UseRouting";
import { FNtransformObjectToArray } from "../Patients/patientMedicalDetailsTable/PatientNavigationHelper";

interface VerticalTabsComponentProps {
  navigationList: any;
  DataTable: ReactNode;
  Footer: ReactNode;
  dataTableProps?: {
    title?: string;
    description?: string;
  };
  defaultValue: string;
  handleNavigation: (value: string) => void;
}

const VerticalTabsComponent = ({
  navigationList,
  dataTableProps,
  DataTable,
  defaultValue,
  Footer,
  handleNavigation,
}: VerticalTabsComponentProps) => {
  const [currentTab, setCurrentTab] = useState(defaultValue);
  const { routePathId } = UseRouting();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    routePathId("active", value);
    handleNavigation(value);
  };

  const MEMOIZE_NAV = Array.isArray(navigationList)
    ? [...navigationList]
    : [...FNtransformObjectToArray({ toTransformData: navigationList })];

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="vertical-tabs"
    >
      <TabsList className="vertical-tab-list flex flex-col items-start overflow-y-auto">
        {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => {
          return (
            <div key={navItem.title} className="flex overflow-x-auto ">
              <TabsTrigger key={navItem.value} value={navItem.value}>
                <text>{navItem.title}</text>
              </TabsTrigger>
            </div>
          );
        })}
      </TabsList>

      <div className="vertical-tab-content">
        <TabsContent value={currentTab}>
          <Card className="full-card">
            {(dataTableProps?.title || dataTableProps?.description) && (
              <CardHeader>
                {dataTableProps?.title && (
                  <CardTitle>{dataTableProps.title}</CardTitle>
                )}
                {dataTableProps?.description && (
                  <CardDescription>
                    {dataTableProps.description}
                  </CardDescription>
                )}
              </CardHeader>
            )}
            <CardContent className="space-y-2">{DataTable}</CardContent>
            {Footer && <CardFooter>{Footer}</CardFooter>}
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default VerticalTabsComponent;
