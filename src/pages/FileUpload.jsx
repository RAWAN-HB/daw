import { useEffect, useState } from "react";
import {
  Upload,
  File,
  FileText,
  Image,
  Trash2,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./FileUpload.css";
import { getProposalFiles, uploadFile, deleteFile, downloadFile } from "../api/index";

export function FileUpload({ proposalId }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch files when component mounts or proposalId changes
  useEffect(() => {
    if (!proposalId) return;
    fetchFiles();
  }, [proposalId]);

  const fetchFiles = async () => {
    try {
      const res = await getProposalFiles(proposalId);
      setUploadedFiles(res.data); // assumes backend returns an array of files
    } catch (err) {
      console.error(err);
      alert("Failed to load files.");
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      await uploadFile(proposalId, formData);
      alert("Files uploaded successfully!");
      fetchFiles(); // refresh the list
    } catch (err) {
      console.error(err);
      alert("Failed to upload files.");
    }
  };

  const handleDelete = async (fileId) => {
    if (!confirm("Delete this file?")) return;
    try {
      await deleteFile(fileId);
      setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete file.");
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const res = await downloadFile(fileId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download file.");
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText size={24} className="icon-red" />;
      case "DOCX":
        return <File size={24} className="icon-blue" />;
      case "JPG":
      case "PNG":
        return <Image size={24} className="icon-green" />;
      default:
        return <File size={24} className="icon-gray" />;
    }
  };

  return (
    <div className="file-upload space-y-6">
      {/* Upload Area */}
      <div className="upload-area card">
        <div className="upload-header">
          <h2>Upload Files</h2>
          <p>Add your presentations, articles and posters for the event</p>
        </div>

        <div className="upload-dropzone">
          <div className="upload-icon">
            <Upload size={32} />
          </div>
          <p>Drag and drop your files here</p>
          <p>or click to browse your files</p>
          <label className="upload-button">
            Select Files
            <input
              type="file"
              multiple
              onChange={handleUpload}
              hidden
              accept=".pdf,.docx,.pptx,.jpg,.png"
            />
          </label>
        </div>
      </div>

      {/* Uploaded Files List */}
      <div className="uploaded-files card">
        <div className="upload-header">
          <h2>Uploaded Files</h2>
          <p>{uploadedFiles.length} file(s) uploaded</p>
        </div>

        <div className="files-list">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-icon">{getFileIcon(file.type)}</div>

              <div className="file-info">
                <p className="file-name">{file.name}</p>
                <div className="file-meta">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span className="file-category">{file.category}</span>
                  <span>•</span>
                  <span>{file.uploadDate}</span>
                </div>
              </div>

              <div className="file-actions">
                {file.status === "Validated" ? (
                  <span className="file-status valid">
                    <CheckCircle size={16} />
                    Validated
                  </span>
                ) : (
                  <span className="file-status pending">
                    <AlertCircle size={16} />
                    {file.status}
                  </span>
                )}

                <button
                  className="btn-icon"
                  onClick={() => handleDownload(file.id, file.name)}
                >
                  <Download size={20} />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => handleDelete(file.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
