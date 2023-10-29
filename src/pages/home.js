import { React, useState } from "react";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../firebase";
// import { storage } from "./firebaseConfig";

import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from "@mui/icons-material/Upload";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function Home() {
  const [file, setFile] = useState("");
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isDisabled, setDisabled] = useState(true);
  let objectName = " ";

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    // setFile(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
    setDisabled(false);
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
          axios.post("api/process-image", {
            objectName: objectName,
          });
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
    <body class="grid justify-items-center w-full bg-primaryGreen">
      <div
        style={{ maxWidth: "500px" }}
        class="w-screen h-screen gap-y-16 px-10 py-20 bg-primaryBlue grid justify-items-center gap-y-2"
      >
        <div class="flex flex-row w-full items-center justify-between">
          <img class="w-3/12" src="/images/medVisionLogo.svg"></img>
          <div>
            <p class="text-2xl">
              Welcome to <span class="text-4xl">MedVision</span>
            </p>
            <p class="text-2xl">Your Medical Assistant</p>
          </div>
        </div>

        <div class="w-full p-6 pb-1 text-primaryGreen border-2 rounded-md">
          <div class="flex justify-between py-4 text-3xl">
            <p>Instructions</p>
            <VolumeUpIcon />
          </div>
          <div class="pt-2 border-t-2 border-primaryGreen ">
            <p>Step 1: Choose Camera or Upload from Gallery</p>
            <p>Step 2: Take or Upload the picture</p>
            <p>
              Step 3: Get the information of your medicine that you provided.
            </p>
          </div>
        </div>

        <div class="pt-5 w=96 bg-primaryBlue grid justify-items-center gap-y-16">
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
              ></input>
            </Button>
          </div>
          <img src={file} />
          <Button
            style={{ padding: "20px 40px" }}
            id="submitBtn"
            variant="contained"
            disabled={isDisabled}
            onClick={handleUpload}
          >
            Submit
          </Button>
        </div>
      </div>
    </body>
  );
}

export default Home;
