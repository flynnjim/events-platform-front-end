import React, { useState } from "react";
import styles from "../AddEvent/AddEvent.module.css";

interface CloudinaryProps {
  onUpload: (url: string) => void;
}

const CloudinaryImageUpload: React.FC<CloudinaryProps> = ({ onUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!image) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "events_upload");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dufw9aqhs/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      if (result.secure_url) {
        setUrl(result.secure_url);
        onUpload(result.secure_url);
        localStorage.setItem("uploadedImageUrl", result.secure_url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>Event Image</label>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className={styles.input}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={styles.submitButton}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {url && (
        <div>
          <p>Upload complete!</p>
          <img
            src={url}
            alt="Uploaded"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUpload;
