"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./FileUploader.css";
import { convertFileToUrl } from "@/lib/utils";

import { useResponse } from "../helperComponent/helperResponse/ResponseComponentHelper";

type FileUploaderV1Props = {
  files?: File[];
  onChange: (data: any) => void;
  uploadControl?: {
    maxUploadFile: number;
    maxAcceptFile: number;
  };
};

type FileProps = {
  name: string;
};

const FileUploaderV1: React.FC<FileUploaderV1Props> = ({
  files,
  onChange,
  uploadControl = { maxUploadFile: 1, maxAcceptFile: 1 },
}) => {
  const { warning, info, success, error } = useResponse();
  const [fileCollection, setFileCollection] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileCollection.length >= uploadControl.maxAcceptFile) {
        return warning("Maximum file limit reached.");
      }

      if (fileRejections.length > 0) {
        const errorMessage =
          fileRejections[0]?.errors[0]?.message || "Something went wrong!";
        return error(errorMessage);
      }

      const currentFileNames = new Set(fileCollection.map((file) => file.name));
      const newFiles = acceptedFiles.filter(
        (file) => !currentFileNames.has(file.name)
      );

      if (newFiles.length !== acceptedFiles.length) {
        warning("Duplicate files removed!");
      }

      if (
        fileCollection.length + newFiles.length >
        uploadControl.maxAcceptFile
      ) {
        return warning(
          "Adding these files will exceed the maximum allowed limit."
        );
      }
      const collection = [...newFiles, ...fileCollection];
      setFileCollection(collection);
      onChange(collection);
      success("Files uploaded successfully!");
    },
    [fileCollection, uploadControl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: uploadControl.maxUploadFile,
  });

  const handleRemoveFile = (name: string) => {
    let collection = [...fileCollection];
    collection = collection.filter((file) => file.name !== name);
    setFileCollection(collection);
    onChange(collection);
    info("File removed!");
  };

  useEffect(() => {
    if (files.length !== 0) setFileCollection(files || []);
  }, [files]);

  return (
    <div className="file-uploader-container">
      <div
        {...getRootProps()}
        className={`file-upload ${isDragActive ? "drag-active" : ""}`}
      >
        <FileUploadComponent />
        <input {...getInputProps()} />
        {fileCollection.map((file, index) => (
          <div
            key={index}
            className="size-full"
            style={{
              textAlign: "center",
              transition: "background-color 0.3s ease",
            }}
          >
            <div className="flex w-full items-center justify-end">
              <button
                type="button"
                onClick={(event) => {
                  handleRemoveFile(file.name);
                  event.stopPropagation();
                }}
                className="rounded-sm border-red-200 bg-red-700 p-0.5"
              >
                Remove
              </button>
            </div>
            <FilePreview file={file} />
          </div>
        ))}
      </div>
    </div>
  );
};

type FilePreviewProps = {
  file: FileProps;
};

const FilePreview: React.FC<FilePreviewProps> = ({ file }: any) => (
  <div className="file-preview" style={{ position: "relative" }}>
    <Image
      src={convertFileToUrl(file)}
      width={300}
      height={200}
      alt="Uploaded preview"
      className="object-cover"
      style={{ objectFit: "cover" }}
    />
  </div>
);

const FileUploadComponent: React.FC = () => (
  <div className="file-upload_placeholder">
    <Image src="/assets/icons/upload.svg" width={40} height={40} alt="Upload" />
    <div className="file-upload_label">
      <p className="text-14-regular">
        <span className="text-green-500">Click to upload</span> or drag and drop
      </p>
      <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </div>
  </div>
);

export default FileUploaderV1;
