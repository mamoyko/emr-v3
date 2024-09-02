"use client";

import Image from "next/image";
import React, { Fragment, useCallback, useEffect, useState } from "react";
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

  return (
    <div className="file-uploader-container">
      <div
        {...getRootProps()}
        className={`file-upload ${isDragActive ? "drag-active" : ""}`}
      >
        {/* <FileUploadComponent /> */}
        <input {...getInputProps()} />
        <ImageList files={fileCollection} handleRemoveFile={handleRemoveFile} />
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
    <Image
      src="/assets/icons/upload.svg"
      width={40}
      height={100}
      alt="Upload"
    />
    <div className="file-upload_label">
      <p className="text-14-regular">
        <span className="text-green-500">Click to upload</span> or drag and drop
      </p>
      <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </div>
  </div>
);

type ImageListProps = {
  files: File[];
  handleRemoveFile: (name: string) => void;
};

const ImageList: React.FC<ImageListProps> = ({ files, handleRemoveFile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = files.length;

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  if (totalImages === 0) {
    return (
      <Fragment>
        <FileUploadComponent />
      </Fragment>
    );
  }

  return (
    <div
      className="flex size-full flex-col gap-1 bg-inherit"
      // style={{ border: "0.5 solid white" }}
    >
      <div className="flex max-w-md flex-row rounded-lg bg-inherit">
        {totalImages >= 2 && (
          <button onClick={handlePrevious} className="h-full w-5 bg-inherit">
            &lt;
          </button>
        )}
        <div className="relative w-full max-w-md overflow-hidden rounded-sm shadow-lg">
          <Image
            src={convertFileToUrl(files[currentIndex])}
            width={300}
            height={200}
            alt="Uploaded preview"
            className="object-cover"
          />
        </div>
        {totalImages >= 2 && (
          <button onClick={handleNext} className="h-full w-5 bg-inherit">
            &gt;
          </button>
        )}
      </div>

      <div className="flex size-full items-center justify-between bg-inherit px-5 ">
        <button
          type="button"
          onClick={(event) => {
            handleRemoveFile(files[currentIndex]?.name);
            event.stopPropagation();
          }}
          className="rounded-xl border-red-200 bg-red-700 px-1 text-left font-bold"
        >
          x
        </button>
        <span>{`${currentIndex + 1}/${totalImages}`}</span>
      </div>
    </div>
  );
};

export default FileUploaderV1;
