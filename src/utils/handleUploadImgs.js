import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import app from "../config/firebase";

// Restriction values
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ALLOWED_TYPES = ["image/jpeg", "image/png"]; // Allowed image types

// Helper function to generate a random 32-character string
const generateRandomString = () => {
  return [...Array(32)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

export const uploadImageToFirebase = async (newImage, oldImagePath) => {
  try {
    const storage = getStorage(app);

    // Delete the old image if it exists
    if (oldImagePath) {
      const oldImageRef = ref(storage, oldImagePath);
      try {
        await deleteObject(oldImageRef);
      } catch (error) {
        if (error.code !== "storage/object-not-found") {
          throw error; // Handle other errors
        }
      }
    }

    // Generate a random name and upload the new image
    const randomName = generateRandomString();
    const storageRef = ref(storage, `images/${randomName}`);
    await uploadBytes(storageRef, newImage);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    throw error; // Rethrow to be handled by the event handler
  }
};

// Function to validate the image before upload
export const validateImage = (image) => {
  try {
    // Check file type
    if (!ALLOWED_TYPES.includes(image.type)) {
    //   toast.error("Invalid file type. Please upload a JPEG or PNG image.");
      return false;
    }

    // Check file size
    if (image.size > MAX_IMAGE_SIZE) {
    //   toast.error("Image is too large. Please reduce the size to 5MB or less.");
      return false;
    }

    return true;
  } catch (error) {
    // toast.error("Image validation failed!");
    return false;
  }
};
