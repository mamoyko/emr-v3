"use client";

import { useState } from "react";

import { Header } from "@/components/Header";

import { FileUploader } from "./fileUploader/FileUploader";
import { useResponse } from "./helperComponent/helperResponse/ResponseComponentHelper";
import { DataTableTest } from "./table/DataTable";
import { FileUploaderV1 } from "./fileUploader/FileUploaderV1";

export const SandBoxPage: React.FC = () => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const { success, error } = useResponse();
  const handleFileChange = () => {
    console.log("+++++++++++++");
    success();
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Sand Box</h1>
        </section>
        <section className="admin-stat">test corner</section>
        <DataTableTest data={[]} />

        <FileUploaderV1 maxFiles={1} onChange={handleFileChange} />
      </main>
    </div>
  );
};
