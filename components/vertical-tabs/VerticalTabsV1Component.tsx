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
import { SkeletonGeneric } from "../helperComponent/SkeletonComponent";
import { FNObjectLevelOneToArray } from "../helperFunctions/TransformObjectToArray";
import UseRouting from "../helperFunctions/UseRouting";
import useWindowDimension from "../helperFunctions/useWindowDimension";
import { CustomLoading } from "../Loader";
import { DetailComponent } from "../Patients/patientMedicalDetailsTable/PatientProfileInfo";
interface VerticalTabsV1ComponentProps {
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
  dataUserCollections: any;
}

const VerticalTabsV1Component = ({
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
  dataUserCollections = {},
}: VerticalTabsV1ComponentProps) => {
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
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="flex w-full items-center justify-center rounded-lg"
      style={{
        height: !height
          ? "100%"
          : `${height - 285 - verticalTabHeightControl}px`,
      }}
    >
      <div className="flex w-[320px] items-center justify-center overflow-y-auto rounded-lg bg-inherit py-[6px] md:px-2">
        <TabsList
          className="flex size-full flex-col items-center justify-center rounded-lg bg-slate-800"
          style={{
            height: !height
              ? "100%"
              : `${height - 300 - verticalTabHeightControl}px`,
          }}
        >
          <div className="size-full" style={{ border: "1px solid white" }}>
            <div className="flex h-[180px] items-center justify-center overflow-y-auto p-1 py-[6px]">
              <div className="flex size-full items-center justify-center rounded-lg bg-white text-black">
                {!dataUserCollections?.name ? (
                  <SkeletonGeneric
                    loaderControl={{
                      height: 40,
                      width: 40,
                      brightness: "0%",
                    }}
                  />
                ) : (
                  "Image box"
                )}
              </div>
            </div>
            <div>
              <DetailComponent
                item={{
                  label: null,
                  value: dataUserCollections?.name,
                }}
                hasLoading={true}
                loadingControl={{
                  height: 10,
                  width: 20,
                  text: "",
                }}
                articleClass="items-center justify-start font-semibold"
              />
            </div>
          </div>

          {TabHeaderComponent}
          <div className="flex h-full flex-wrap items-center justify-center md:flex-col">
            {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => (
              <TabsTrigger
                key={navItem.value}
                value={navItem.value}
                className={`flex w-full cursor-pointer bg-transparent py-2.5 text-left transition-colors duration-200 ease-in-out hover:bg-gray-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isLoading}
              >
                <span className="col-start-1 flex text-wrap text-center text-sm dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:row-start-4">
                  {navItem.title}
                </span>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </div>
      <div className="flex size-full flex-col items-center justify-center overflow-y-auto pr-2">
        <TabsContent
          className="size-full"
          value={currentTab}
          style={{
            height: !height
              ? "100%"
              : `${height - 300 - verticalTabHeightControl}px`,
          }}
        >
          <Card className="flex size-full flex-col overflow-y-auto rounded-lg">
            {(TitleComponent || DescriptionComponent) && (
              <CardHeader className="sticky top-0 z-10 shadow-md">
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
              <CardContent className="space-y-1">
                {ContentComponent}
              </CardContent>
            )}
            {FooterComponent && <CardFooter>{FooterComponent}</CardFooter>}
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default VerticalTabsV1Component;
