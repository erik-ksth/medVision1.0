import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
// import { storage } from "./firebaseConfig";

import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from "@mui/icons-material/Upload";

function Home() {
  const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageUrls, setImageUrls] = useState([]);
  // let objectName = " ";

  // const imagesListRef = ref(storage, "images/");
  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //       console.log("Object Name: ", objectName);

  //       axios.post('api/process-image', {
  //         objectName: objectName
  //       })
  //     });
  //   });
  // };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <body class="grid justify-items-center w-full bg-red-400">
      <div class="w-96 bg-blue-400 grid justify-items-center gap-y-32">
        <h1>Welcome to Med Vision</h1>

        <div class="w-auto h-5 relative">
          <Button
            variant="contained"
            startIcon={<AddAPhotoIcon />}
            style={{ padding: "20px 40px" }}
          >
            Camera
            <input
              class="opacity-0 cursor-pointer absolute h-full"
              type="file"
              id="captureImg"
              capture="user"
              accept="image/*"
              onChange={handleChange}
              // onChange={(event) => {
              //   handleChange();
              //   uploadFile();
              //   objectName = event.target.files[0].name;
              //   console.log(event.target.files[0].name);
              // }}
            ></input>
          </Button>
        </div>

        <div class="w-auto h-5 relative">
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            style={{ padding: "20px 40px" }}
          >
            Upload
            <input
              class="opacity-0 cursor-pointer absolute h-full"
              type="file"
              id="uploadImg"
              accept="image/png, image/jpeg, image/heic"
              onChange={handleChange}
              // onChange={(event) => {
              //   handleChange();
              //   uploadFile();
              //   objectName = event.target.files[0].name;
              //   console.log(event.target.files[0].name);
              // }}
            ></input>
          </Button>

        </div>
          <Button variant="contained" onClick={handleUpload}>Upload to Firebase</Button>
      </div>
    </body>
  );
}

export default Home;
