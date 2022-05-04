// import React from "react";

// /**
//  * Component to handle file upload. Works for image
//  * uploads, but can be edited to work for any file.
//  */
// function FileUpload(params) {
//   // State to store uploaded file
//   const [files, setFiles] = React.useState([]);

//   // Handles file upload event and updates state
//   function handleUpload(event) {
//         setFiles(event.target.files);
//     }
    

//     // Add code here to upload file to server
//     // ...
//   }

//   return (
//     <div id="upload-box">
//       <input type="file" multiple={params.oneFile === true} onChange={handleUpload} />
//       {() => {
//           files
//       }
      
//       <p>Filename: {files.name}</p>
//       <p>File type: {files.type}</p>
//       <p>File size: {files.size} bytes</p>
//       {files && <ImageThumb image={files} />}
//     </div>
//   );
// }

// /**
//  * Component to display thumbnail of image.
//  */
// const ImageThumb = ({ image }) => {
//   return <img src={URL.createObjectURL(image)} alt={image.name} />;
// };


// export default function FileUploadComponent() {
//   return <FileUpload />;
// }

export const uploadDocuments = async (files, setDisplayedImage, task, shownImages = null, setIsLoading = null) => {
    if(task === "training"){
    setIsLoading(true);
    }
    const filePromises = files.map((file) => {
      // Return a promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            // Resolve the promise with the response value
            resolve(reader.result);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all promises to be resolved
    await Promise.all(filePromises).then((values) => {
        if(task === "training"){
        setDisplayedImage([...shownImages, ...values]);
        setIsLoading(false);
        }
        else{
        setDisplayedImage(values);
        }
    })

  };

