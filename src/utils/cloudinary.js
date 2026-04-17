// ==================== CLOUDINARY UPLOAD ====================

const uploadToCloudinary = async (file, folder = "smit-connect") => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
    throw new Error("Upload failed");
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
