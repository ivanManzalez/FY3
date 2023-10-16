import {rootStorage} from "../firebaseConfig";

// Get a reference to the storage service, 
// which is used to create references in your storage bucket
const PLAYERS_BUCKET = "players/"; 
const TEAMS_BUCKET = "teams/";
const TEST_BUCKET = "test/";

const createTestStorageRef = (dirname) => {
  const testbucket = TEST_BUCKET+dirname +"/";
  console.log("createTestStorageRef: ",testbucket);
  return rootStorage.ref(testbucket);
};

// PLAYERS_BUCKET/<playerId>/
const createPlayerStorageRef = (playerId) => {
  const playerBucket = playerId +"/";
  return PLAYERS_BUCKET.ref(playerBucket);
};

// TEAMS_BUCKET/<teamId>/
const createTeamStorageRef = (teamId) => {
  const teamBucket = teamId +"/";
  return TEAMS_BUCKET.ref(teamBucket);
};

// Upload File to FILENAME

// uploadBytes(storageRef, filename)
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
  // Create a Blob from the file
  const blob = new Blob([file]);

  // Upload the file resumable
  const uploadTask = storageRef.put(blob);

  // const uploadTask = storageRef.uploadBytesResumable(file);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
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

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    })
};

export {createTestStorageRef, createPlayerStorageRef, createTeamStorageRef, uploadFileResumable, uploadFileBytes};

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