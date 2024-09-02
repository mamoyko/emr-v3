"use client";

import Image from "next/image";
import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderV1Props = {
  // files: File[] | undefined;
  onChange: () => void;
  maxFiles: number;
};

type FileCollectionProps = {
  fileRejections: any[];
  acceptedFiles: any[];
};

export const FileUploaderV1 = ({
  // files,
  onChange,
  maxFiles,
}: FileUploaderV1Props) => {
  const [fileCollection, setFileCollection] = useState<FileCollectionProps>({
    fileRejections: [],
    acceptedFiles: [],
  });
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[], event: any) => {
      onChange();
      const isAccepted = acceptedFiles.length > 0;
      const collectionType = isAccepted ? "acceptedFiles" : "fileRejections";

      const isDuplicate =
        isAccepted &&
        fileCollection.acceptedFiles.some(
          (file) => file.name === acceptedFiles[0].name
        );

      if (isDuplicate) {
        alert("Duplicate file detected!");
        return;
      }

      const newFiles = isAccepted ? acceptedFiles : fileRejections;

      setFileCollection((prevCollection) => ({
        ...prevCollection,
        [collectionType]: [...prevCollection[collectionType], ...newFiles],
      }));
    },
    [onChange, fileCollection]
  );

  console.log("fileCollection", fileCollection);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
    },
    maxFiles,
    // fileRejections: [],
  });

  return (
    <div className="file-uploader-container">
      <div
        {...getRootProps()}
        className={`file-upload ${isDragActive ? "drag-active" : ""}`}
        // style={{
        //   textAlign: "center",
        //   backgroundColor: isDragActive ? "#f0f0f0" : "#qqqqq",
        //   transition: "background-color 0.3s ease",
        //   flex: "1",
        //   border: ".01px dashed #ddd",
        // }}
      >
        <FileUploadComponent />
        <input {...getInputProps()} />
        {acceptedFiles.map((file, index) => {
          return (
            <div
              key={index}
              style={{
                textAlign: "center",
                backgroundColor: isDragActive ? "#f0f0f0" : "#qqqqq",
                transition: "background-color 0.3s ease",
                flex: "1",
                border: ".01px dashed #ddd",
              }}
            >
              <FilePreview file={file} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilePreview = ({ file }) => {
  return (
    <Fragment>
      {/* {Object.entries(file ?? {}).length !== 0 ? ( */}
      <div
        className="file-preview"
        style={{
          border: "1px solid white",
        }}
      >
        <Image
          src={convertFileToUrl(file)}
          width={300}
          height={300}
          alt="Uploaded preview"
          className="object-cover"
        />
      </div>
      {/* ) : (
        <div className="file-upload_placeholder">
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="Upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      )} */}
    </Fragment>
  );
};

const FileUploadComponent = () => {
  return (
    <div>
      <div className="file-upload_placeholder">
        <Image
          src="/assets/icons/upload.svg"
          width={40}
          height={40}
          alt="Upload"
        />
        <div className="file-upload_label">
          <p className="text-14-regular">
            <span className="text-green-500">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-12-regular">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>
    </div>
  );
};
