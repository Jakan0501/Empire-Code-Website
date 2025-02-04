import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as Buffer

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file limit
});

export default upload;
