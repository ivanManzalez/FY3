import {rootStorage} from "../firebaseConfig";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Get a reference to the storage service, 
// which is used to create references in your storage bucket
const PLAYERS_BUCKET = "players/"; 
const TEAMS_BUCKET = "teams/";
const TEST_BUCKET = "test/";

const createTestStorageRef = (dirname, filename) => {
  const testbucket = TEST_BUCKET+dirname +"/"+filename;
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

          // ...

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
//

// const taskHandler = (uploadTask) => {
//   uploadTask.on('state_change',
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       const state = snapshot.state;
//       console.log("progress:",progress);
//     },
//     (error) => {
//       switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;
//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//       } 
//     },
//     () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//       resolve({ progress: 100, status: 'completed', downloadURL }); // Resolve the promise with the download URL or any other data you want to return
//   })
//   ) 
// }


export {createTestStorageRef, createPlayerStorageRef, createTeamStorageRef, uploadFileResumable, uploadFileBytes};



// 
// uploadTask.on(
//     'state_changed', 
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       const state = snapshot.state;
//       console.log("progress:",progress);
//     },

//     (error) => {
//       switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;
//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//       }
//       console.error(error);
//     }, 
    
//     () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//       resolve({ progress: 100, status: 'completed', downloadURL }); // Resolve the promise with the download URL or any other data you want to return
//       }),
//     )
//   }

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