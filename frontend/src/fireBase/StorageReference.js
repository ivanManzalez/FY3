import {rootStorage} from "../firebaseConfig";
import { deleteObject } from "firebase/storage";

// Get a reference to the storage service, 
// which is used to create references in your storage bucket
const PLAYERS_BUCKET = "players/"; 
const TEAMS_BUCKET = "teams/";
const TEST_BUCKET = "test/";

const getTestStorageRef = (dirname, filename) => {
  const testbucket = TEST_BUCKET+dirname +"/"+filename;
  return rootStorage.ref(testbucket);
};

// PLAYERS_BUCKET/<playerId>/
const getPlayerStorageRef = (playerId) => {
  const playerBucket = playerId +"/";
  return PLAYERS_BUCKET.ref(playerBucket);
};

// TEAMS_BUCKET/<teamId>/
const getTeamStorageRef = (teamId) => {
  const teamBucket = teamId +"/";
  return TEAMS_BUCKET.ref(teamBucket);
};

// Upload File to FILENAME
const uploadFileBytes = (storageRef, file) => {
  storageRef.uploadBytes(file)
  .then((snapshot) => {
    console.log('Uploaded a blob or file!');
  })
  .catch((error) => {
    console.error(error);
    return error;
  })
};

// uploadBytesResumable(storageRef, filename)
const uploadFileResumable = (storageRef, file) => {
  // Create a Blob using the input the file
  return new Promise((resolve, reject) => {
    const blob = new Blob([file]);
    // Upload the file resumable
    const uploadTask = storageRef.put(blob);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        console.error(error);
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve({ progress: 100, status: 'completed', downloadURL }); // Resolve the promise with the download URL or any other data you want to return
        });
      }
    );
  });
};

const downloadFile = (storageRef) => {
  console.log("commencing download for: ", storageRef.fullPath)
  return storageRef.getDownloadURL()
    .then((url)=> {
      console.log("downloadFile: returned url")
      return url;
    })
    .catch((error) => {
      console.log("downloadFile: did not return url")
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }

  });
} 

const getProfilePicURL = (id) => {
  const profilePicRef = getTestStorageRef(id, "profilepic.png");
  return downloadFile(profilePicRef);
};

const deleteProfilePicURL = (id) => {
  const profilePicRef = getTestStorageRef(id, "profilepic.png");
  return deleteObject(profilePicRef);
}

export {deleteProfilePicURL, getProfilePicURL, getTestStorageRef, getPlayerStorageRef, getTeamStorageRef, uploadFileResumable, uploadFileBytes, downloadFile};


/////// Navigating through ref

// Parent allows us to move to the parent of a reference
// const imagesRef = spaceRef.parent; // imagesRef now points to 'images'

// Root allows us to move all the way back to the top of our bucket
// const rootRef = spaceRef.root; // rootRef now points to the root


/////// Reference Properties
// Reference's path is: 'images/space.jpg'
// This is analogous to a file path on disk
// spaceRef.fullPath;

// Reference's name is the last segment of the full path: 'space.jpg'
// This is analogous to the file name
// spaceRef.name;

// Reference's bucket is the name of the storage bucket where files are stored
// spaceRef.bucket;

