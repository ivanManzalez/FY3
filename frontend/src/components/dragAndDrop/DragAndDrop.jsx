import React from 'react';

const DragAndDrop = (props) => {
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewURL, setPreviewURL] = React.useState("");
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'This is the data that will be dropped.');
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow a drop.
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add visual cues to show that the element can be dropped here (e.g., change the background color).
    // You can update the component state here to change the style as well.
  };

  const handleDragLeave = () => {
    // Remove any visual cues for leaving the drop area.
    // You can reset the component state here to remove styles.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // const acceptedTypes = ['image/png', 'image/jpeg', 'image/gif']; // Add the MIME types you want to accept.
    
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      const files = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          console.log(e.dataTransfer);
          const file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }

      if (files.length > 0) {
        // Read and display the file content.
        files.forEach((file) => {
          setUploadedFile(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            const previewUrl = event.target.result;
            handleDroppedFile(file, previewUrl);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleDroppedFile = (file, previewUrl) => {
    setUploadedFile(file);
    setPreviewURL(previewUrl);

  };

  const handleDelete = () => {
    setUploadedFile(null);
    setPreviewURL(null);
  };
  const handleUploadButton = () => {
    console.log("Upload this file --> ",uploadedFile.name)
    props.handleFileUpload(uploadedFile);
  }
  return (
    <div id={"drap_and_drop"}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={` drop-area ${isDragging ? 'dragging' : ''}`}
    >
    {!previewURL && <p>Drag image here</p>}
    {previewURL && 
      <> 
      <img src={previewURL} alt="Dropped file preview" /> 
      <button className={"delete"} onClick={handleDelete} > Delete Upload </button>
      <button className={"submit"} onClick={handleUploadButton} > Upload file </button>
      </>}
    </div>
  );
};

export default DragAndDrop;

// import React from 'react';
// import DragAndDrop from './DragAndDropComponent';

// const MyFileUploader = () => {
//   const handleFilesDropped = (files) => {
//     // Handle the dropped files, e.g., upload them or perform any desired operations.
//     console.log('Dropped files:', files);
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <DragAndDrop onFilesDropped={handleFilesDropped} />
//     </div>
//   );
// };


