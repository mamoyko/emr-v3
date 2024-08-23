"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { getPatientList } from "@/lib/actions/patient.actions";

import SearchComponent from "../helperComponent/SearchComponent";
import UseRouting from "../helperFunctions/UseRouting";
import { columnsPatient } from "../table/columns";
import { DataTable } from "../table/DataTable";
import { Button } from "../ui/button";
interface CollectionProps {
  dataCollection: any;
  isSearching: string;
}

const PatientsComponent = () => {
  const { routePath } = UseRouting();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [patientCollection, setPatientCollection] = useState<CollectionProps>({
    dataCollection: [],
    isSearching: "",
  });
  const fetchPatientList = async (paginate: any) => {
    setIsLoading(true);
    const response = await getPatientList(paginate);
    if (response.ok) {
      setPatientCollection((prev: any) => {
        const stateCollection = { ...prev };
        stateCollection.dataCollection = response.data;
        return stateCollection;
      });
    } else {
      console.error("Failed to fetch:", response?.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPatientList("");
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="flex-1 items-start justify-between overflow-y-auto px-[5%] xl:space-y-8 xl:px-12">
        <section className="flex w-full items-end justify-between space-y-4">
          <h1 className="header">Patients</h1>
          <Button
            variant="ghost"
            className="capitalize text-sky-500"
            onClick={() => routePath(`/admin/patients/create`)}
          >
            Add Patient
          </Button>
        </section>
        <section className="w-full flex-row items-end justify-between space-y-4">
          <SearchComponent
            handleSearch={(query: any) => {
              const collection = {
                name: query,
              };
              // fetchPatientList(collection);
            }}
            iniSearchValue={""}
          />
          <DataTable
            columns={columnsPatient}
            data={patientCollection.dataCollection || []}
          />
        </section>
      </main>
    </div>
  );
};

export default PatientsComponent;
