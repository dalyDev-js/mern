import multer from "multer";

// Configure multer storage, here we use memoryStorage for temporary storage before processing
const storage = multer.memoryStorage(); // or use diskStorage for storing files on disk

// Initialize multer middleware
export const upload = multer({ storage: storage });
