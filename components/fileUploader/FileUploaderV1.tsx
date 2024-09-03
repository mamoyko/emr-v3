"use client";

import Image from "next/image";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./FileUploader.css";
import { convertFileToUrl } from "@/lib/utils";

import { useResponse } from "../helperComponent/helperResponse/ResponseComponentHelper";

type FileUploaderGenericProps = {
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

const FileUploaderGeneric: React.FC<FileUploaderGenericProps> = ({
  files,
  onChange,
  uploadControl = { maxUploadFile: 1, maxAcceptFile: 1 },
}) => {
  const { warning, info, success, error } = useResponse();
  const [fileCollection, setFileCollection] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      if (newFiles.length === acceptedFiles.length)
        success("Files uploaded successfully!");
    },
    [fileCollection, uploadControl]
  );

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fileCollection.length);
    event.stopPropagation();
  };

  const handlePrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + fileCollection.length) % fileCollection.length
    );
    event.stopPropagation();
  };

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
    <div className="">
      <ImageListHeader
        currentFile={fileCollection[currentIndex]}
        handleRemoveFile={handleRemoveFile}
        totalImages={fileCollection.length}
        currentIndex={currentIndex}
      />
      <div className="file-uploader-container">
        <div
          {...getRootProps()}
          className={`text-12-regular flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 ${isDragActive ? "drag-active" : ""}`}
          style={{
            transition: "background-color 0.3s ease",
            flex: "1",
            border: ".01px dashed #ddd",
          }}
        >
          <input {...getInputProps()} />
          <ImageListPreview
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            currentFile={fileCollection[currentIndex]}
            totalImages={fileCollection.length}
          />
        </div>
      </div>
    </div>
  );
};

const FileUploadView: React.FC = () => (
  <div className="file-upload_placeholder p-5">
    <Image src="/assets/icons/upload.svg" width={40} height={40} alt="Upload" />
    <div className="file-upload_label">
      <p className="text-14-regular">
        <span className="text-green-500">Click to upload</span> or drag and drop
      </p>
      <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </div>
  </div>
);

type ImageListPreviewProps = {
  handlePrevious: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
  totalImages: number;
  currentFile: any;
};

const ImageListPreview: React.FC<ImageListPreviewProps> = ({
  handleNext,
  handlePrevious,
  totalImages,
  currentFile,
}) => {
  const fixedImageSize = { width: 300, height: 200 };

  const buttonClasses =
    totalImages >= 2
      ? "h-full w-10 rounded-lg bg-inherit transition-colors duration-300 hover:bg-gray-600 hover:text-blue-600"
      : "cursor-not-allowed w-10";

  if (totalImages === 0) {
    return <FileUploadView />;
  }

  return (
    <div className="flex h-full flex-row items-center justify-center gap-1 bg-inherit">
      <button onClick={handlePrevious} className={buttonClasses} />
      <div
        style={{
          width: fixedImageSize?.width,
          height: fixedImageSize?.height,
        }}
        className="relative flex items-center justify-center overflow-hidden rounded-sm shadow-lg"
      >
        <Image
          src={convertFileToUrl(currentFile)}
          width={fixedImageSize?.width}
          height={fixedImageSize?.height}
          alt="Uploaded preview"
          className="object-cover"
        />
      </div>
      <button onClick={handleNext} className={buttonClasses} />
    </div>
  );
};

type ImageListHeaderProps = {
  currentFile: any;
  handleRemoveFile: (name: string) => void;
  totalImages: number;
  currentIndex: number;
};

const ImageListHeader: React.FC<ImageListHeaderProps> = ({
  currentFile,
  handleRemoveFile,
  totalImages,
  currentIndex,
}) => {
  return (
    <div className="flex size-full items-start justify-between bg-inherit">
      <button
        type="button"
        onClick={(event) => {
          handleRemoveFile(currentFile.name);
          event.stopPropagation();
        }}
        className="rounded-md border-red-200 bg-red-700 px-1 text-left font-bold"
      >
        remove
      </button>
      <span>{`${currentIndex + 1}/${totalImages}`}</span>
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

export default FileUploaderGeneric;
