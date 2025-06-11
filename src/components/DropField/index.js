import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export function DropField({ setDataFilesUploaded }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  useEffect(() => {
    setDataFilesUploaded(acceptedFiles)
  }, [acceptedFiles])
  

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #999",
        padding: 40,
        textAlign: "center",
        borderRadius: 10,
        color: "#555",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop files here, or click to select them</p>
      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}
