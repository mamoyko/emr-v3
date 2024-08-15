"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
export const FileUploaderNew = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,
  });

  const filePreview =
    files && files.length > 0 ? (
      <div className="file-preview">
        <Image
          src={convertFileToUrl(files[0])}
          width={300}
          height={300}
          alt="Uploaded preview"
          className="object-cover"
        />
      </div>
    ) : (
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
    );

  return (
    <div className="file-uploader-container">
      <div
        {...getRootProps()}
        className={`file-upload ${isDragActive ? "drag-active" : ""}`}
        style={{
          textAlign: "center",
          backgroundColor: isDragActive ? "#f0f0f0" : "#ffffff",
          transition: "background-color 0.3s ease",
          flex: "1",
          border: "2px dashed #ddd",
        }}
      >
        <input {...getInputProps()} />
        {filePreview}
      </div>
    </div>
  );
};
