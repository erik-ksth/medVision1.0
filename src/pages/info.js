import React from "react";
import useSound from 'use-sound';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import voice from "../en-US-Standard-J.wav";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

function Info() {
     const [play] = useSound(voice);
     // play();
  return (
    <body class="grid justify-items-center w-full h-screen bg-primaryGreen">
      <div
        style={{ maxWidth: "500px" }}
        class="relative w-screen h-screen gap-y-16 px-10 py-20 bg-primaryBlue grid justify-items-center"
      >
          <img className="absolute top-2 left-4" src="/images/medVisionLogo.svg"></img>
          <VolumeUpIcon onClick={play} class="absolute w-20 top-0 right-0 cursor-pointer"/>
          <p class="text-3xl font-bold border-b-2 w-full text-center h-min pb-5">Description</p>
          <div class="flex w-auto max-w-md absolute top-40 px-2">
               <div class="w-1/4">
                    <p class="py-5">Name: </p>
                    <p class="py-5">Usage: </p>
                    <p class="py-5">Dosage: </p>
                    <p class="py-5">Storage: </p>
               </div>
               <div class="w-3/4 text-justify">
                    <p class="py-5">Paracetamol</p>
                    <p class="py-5">Paracetamol is an analgesic and antipyretic medication used to relieve pain and reduce fever. It is commonly used to treat headaches, muscle aches, toothaches, and menstrual cramps.
</p>
                    <p class="py-5">The recommended dosage for adults is 500 mg to 1,000 mg every 4 to 6 hours, not exceeding 4,000 mg in a 24-hour period. For children, the dosage is based on their weight and age. Consult a doctor or pharmacist for the appropriate dosage for children.
</p>
                    <p class="py-5">Store the medication at room temperature, away from moisture and heat. Keep it in a tightly closed container and out of the reach of children. Do not use the medication if it has expired or if the packaging has been tamper</p>
               </div>
          </div>
          <Button
            style={{ width:'100px', height: '50px', position: 'absolute', bottom: '20px', backgroundColor: '#006D77' }}
            id="submitBtn"
            variant="contained"
            component={Link}
            to={"/"}
          >
            Done
          </Button>
      </div>
    </body>
  );
}

export default Info;
