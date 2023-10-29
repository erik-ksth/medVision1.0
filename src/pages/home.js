import React from "react";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadIcon from '@mui/icons-material/Upload';

function Home() {
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
            ></input>
          </Button>
        </div>
        
      </div>
    </body>
  );
}

export default Home;
