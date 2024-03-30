import axiosInstance from "../api-config/axiosInstance";

export const generateSignedUrl = async (fileName, contentType,) => {
    try {
      const payload = {
        ContentType: contentType,
        fileName,
        uploadType: "DOCUMENTS",
      };
      console.log("generateSignedUrl function work", payload);
      const signedUrl = await axiosInstance.post(
        "/generateS3UploadSignedUrl",payload
      );
      console.log("Image Upload", JSON.parse(signedUrl.data.data));
      return JSON.parse(signedUrl.data.data);
    } catch (error) {
      console.error("Error While Uploading File", error);
    }
  };


export  const uploadFileOnS3 = async (file, signedUrl) => {
    try {
      const uploadResponse = await fetch(signedUrl, {
        body: file,
        headers: {
          "Content-Type": file.type},
        method: "PUT",
      });
      console.log("uploadFileOnS3 working :", {uploadResponse});
      return uploadResponse;
    } catch (error) {
    }
  };
  