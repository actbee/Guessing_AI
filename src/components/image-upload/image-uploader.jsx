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
