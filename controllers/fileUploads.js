// Importing Firebase Admin SDK
const admin = require("firebase-admin");

// Initializing Firebase Admin SDK with service account credentials
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  // Replacing escaped newline characters in private key
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initializing Firebase Admin with credentials and storage bucket
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "servis-app-2a54c.appspot.com",
});

// Accessing Firebase Storage
const storage = admin.storage().bucket();

// Accessing Firebase Firestore
const firestore = admin.firestore();

// Middleware function to upload files to Firebase Storage
exports.uploadToStorage = async (req, res, next) => {
  try {
    // If no file is present in the request, proceed to the next middleware
    if (!req.file) {
      return next();
    }

    // Extracting the file from the request
    const file = req.file;

    // Creating a reference to the file in Firebase Storage
    const fileUpload = storage.file(file.originalname || "");

    // Creating a writable stream to upload the file
    const stream = fileUpload.createWriteStream();

    // Writing the file buffer to the stream
    stream.end(file.buffer);

    // Generating a signed URL for the uploaded file
    const downloadURL = await fileUpload.getSignedUrl({
      action: "read",
      // Setting expiry date for the signed URL
      expires: "2025-03-09T12:00:00Z",
    });

    // Storing the download URL in the request object for further use
    req.downloadURL = downloadURL[0];

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handling errors and sending appropriate error response
    console.log("Error in uploading to storage", error);
    res.status(500).json({ message: "Something went wrong uploading file" });
  }
};
