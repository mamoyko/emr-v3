"use client";

import { useState } from "react";

import { Header } from "@/components/Header";

import { FileUploader } from "./fileUploader/FileUploader";
import FileUploaderGeneric from "./fileUploader/FileUploaderGeneric";
import { useResponse } from "./helperComponent/helperResponse/ResponseComponentHelper";
import { DataTableTest } from "./table/DataTable";

export const SandBoxPage: React.FC = () => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const { success, error, warning, info } = useResponse();
  const handleFileChange = (data) => {
    setFiles(data);
    warning();
    // success();
    // error();
    // info();
  };
  console.log("files ==", files);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Sand Box</h1>
        </section>
        <section className="admin-stat">test corner</section>
        <DataTableTest data={[]} />
        <FileUploaderGeneric
          uploadControl={{
            maxUploadFile: 5,
            maxAcceptFile: 5,
          }}
          files={files}
          onChange={handleFileChange}
        />
        <FileUploader files={files} onChange={(data) => setFiles(data)} />
      </main>
    </div>
  );
};
