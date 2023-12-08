import React from 'react';

const DragAndDrop = React.forwardRef((props,ref) => {
  const [uploadFile, setUploadFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewURL, setPreviewURL] = React.useState(props.url);
  const [className, setClassName] = React.useState("");
  const [progress, setProgress] = React.useState(null);
  

  React.useEffect(()=>{
    if(previewURL){
      setClassName("img_preview");
    }else{
      setClassName("drop-area");
    }

  },[]);
  const handleDragStart = (e) => {
    e.dataTransfer.setData('image/*', 'This is the data that will be dropped.');
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow a drop.
    console.log("dragover:", previewURL)
    if(previewURL){
      setIsDragging(false);
      setClassName("img_preview dragover")
    }else{
      setClassName("dragover")
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add visual cues to show that the element can be dropped here (e.g., change the background color).
    // You can update the component state here to change the style as well.
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    // Remove any visual cues for leaving the drop area.
    // You can reset the component state here to remove styles.
    if(previewURL){
      setIsDragging(false);
      setClassName("img_preview")
    }else{
      setClassName("drop-area")
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setClassName("img_preview");

    // const acceptedTypes = ['image/png', 'image/jpeg', 'image/gif']; // Add the MIME types you want to accept.
    
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      const files = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          // console.log(e.dataTransfer);
          const file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }

      if (files.length > 0) {
        // Read and display the file content.
        files.forEach((file) => {
          handleFileInput(file);
        });
      }
    }
  };

  const handleFileInput = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const previewUrl = event.target.result;
      handleDroppedFile(file, previewUrl);
    };
    reader.readAsDataURL(file);
  }

  const handleDroppedFile = (file, previewUrl) => {
    setUploadFile(file);
    setPreviewURL(previewUrl);
  };

  const handleDelete = () => {
    setUploadFile(null);
    setPreviewURL(null);
    setProgress(null);
    setClassName("drop-area");
    props.handleImgDelete();
  };

  // const handleUploadButton = async () => {
  //   const uploadOutcome = await props.handleFileUpload(uploadedFile);

  //   if(uploadOutcome.progress < 100){
  //     setProgress(uploadOutcome.progress);
  //   }else if(uploadOutcome.progress == 100){
  //     setProgress(100);
  //     console.log("Upload completed.")
  //     handleDelete();
  //   }
  //   else{
  //     console.log("error has occured")
  //   }
  // }


  const handleFileInputChange =  (e) => {
    handleFileInput(e.target.files[0]);
    setClassName(" img_preview");
  }
  // Replace Submit button
  React.useImperativeHandle(ref, () => {
    return {
      uploadFile,
      handleDelete,
    };
  });

  return (
    <div id={"drag_and_drop"} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={" centre align "+className}
    >
    {!previewURL && 
      <>
      <input id="file" type="file" accept="image/*" onChange={handleFileInputChange} /> 
      </>
    }
    {previewURL && 
      <div className="img_container"> 
      {progress && <div>{progress}%</div>}

      <img src={previewURL} alt="Dropped file preview" /> 
     
      <div className="">
      <button className={"delete"} onClick={handleDelete} > Delete File </button>
      </div>

      </div>}
    </div>
  );
});

export default DragAndDrop;
