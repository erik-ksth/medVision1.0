import React from "react";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from "@mui/icons-material/Upload";

function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
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
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
                uploadFile();
              }}
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
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              onClick={uploadFile}
            ></input>
          </Button>
        </div>
      </div>
    </body>
  );
}

export default Home;
