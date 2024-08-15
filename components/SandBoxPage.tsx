"use client";

import { useState } from "react";

import { Header } from "@/components/Header";

import { FileUploader, FileUploaderNew } from "./fileUploader/FileUploader";

export const SandBoxPage: React.FC = () => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Sand Box</h1>
        </section>
        <section className="admin-stat">ss</section>
        <FileUploader files={files} onChange={handleFileChange} />
        <FileUploaderNew files={files} onChange={handleFileChange} />
      </main>
    </div>
  );
};
