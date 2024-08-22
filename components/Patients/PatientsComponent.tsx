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
    fetchPatientList({});
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Patients</h1>
        </section>
        <section className="admin-stat">
          <Button
            variant="ghost"
            className="capitalize text-sky-500"
            onClick={() => routePath(`/admin/patients/create`)}
          >
            Add Patient
          </Button>
        </section>
        <SearchComponent
          handleSearch={(query: any) => {
            const params = {
              name: query,
            };
            fetchPatientList(params);
          }}
          iniSearchValue={""}
        />
        <DataTable
          columns={columnsPatient}
          data={patientCollection.dataCollection || []}
        />
      </main>
    </div>
  );
};

export default PatientsComponent;
