import React, { useState } from "react";
import axios from "axios";
import "./DocumentUpload.css";

function ResultUpload() {
  const [files, setFiles] = useState({
    matric: null,
    inter: null,
    EntryTest: null
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg"
  ];

  // ================= FILE CHANGE =================
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file && !allowedTypes.includes(file.type)) {
      setError("Only PDF or Image files are allowed!");
      return;
    }

    setError("");

    setFiles({
      ...files,
      [e.target.name]: file
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // ✅ Required validation

    if (!files.matric || !files.inter) {

      setError(
        "Matric and Inter results are required!"
      );

      return;
    }

    const formData = new FormData();
    const currentUserEmail =
      localStorage.getItem(
        "currentUser"
      );

    formData.append(
      "userEmail",
      currentUserEmail
    );

    formData.append(
      "matric",
      files.matric
    );

    formData.append(
      "inter",
      files.inter
    );

    // ✅ Optional Entry Test

    if (files.EntryTest) {

      formData.append(
        "EntryTest",
        files.EntryTest
      );
    }

    try {

      const res = await axios.post(
        "https://university-admission-support-system.up.railway.app/uploadResults",
        formData
      );

      setSuccess(res.data.message);

      setError("");

      // ================= DOCUMENT FLAG =================

      localStorage.setItem(
        "documentsUploaded",
        "true"
      );

      // ================= UPDATE USER DOCUMENT COUNT =================
      const currentUserEmail = localStorage.getItem("currentUser");

      let uploadedCount = 2;
      if (files.EntryTest) {
        uploadedCount += 1;
      }

      if (currentUserEmail) {
        try {
          await axios.put(`https://university-admission-support-system.up.railway.app/api/users/${currentUserEmail}`, {
            uploadedDocuments: uploadedCount
          });
        } catch (err) {
          console.error("Failed to update document count in DB:", err);
        }
      }

      alert(
        "Results Uploaded Successfully"
      );

    } catch (err) {

      setError(
        err.response?.data ||
        "Upload Failed"
      );

      setSuccess("");
    }
  };

  // ================= UI =================
  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Academic Results</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit}>

          {/* MATRIC */}
          <label>Matric Result (Required)</label>
          <input type="file" name="matric" onChange={handleChange} />
          {files.matric && (
            <p className="file-name">{files.matric.name}</p>
          )}

          {/* INTER */}
          <label>Intermediate Result (Required)</label>
          <input type="file" name="inter" onChange={handleChange} />
          {files.inter && (
            <p className="file-name">{files.inter.name}</p>
          )}

          {/* ENTRY TEST */}
          <label>Entry Test Result (Optional)</label>
          <input type="file" name="EntryTest" onChange={handleChange} />
          {files.EntryTest && (
            <p className="file-name">{files.EntryTest.name}</p>
          )}

          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResultUpload;