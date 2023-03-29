import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tfc from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import { Canvas, VideoBlock, Wrapper } from './App.style';
import frame from "./frame";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const predict = async () => {
    cocossd.load().then((m: any) => {
        setInterval(() => {
          detect(m)
        }, 10) 
    }).catch((e: any) => {
      console.log(e)
    })
  }

  const detect = async (model: any) => {
    const webCamCurrent: any = webcamRef.current
    const canvasCurrent: any = canvasRef.current
    const video: any = webCamCurrent.video

    if (webcamRef.current !== "undefined" && webcamRef.current !== null && video.readyState === 4) {
      const { width, height } = video.getBoundingClientRect();

      const videoWidth = width
      const videoHeight = height

      video.width = videoWidth
      video.height = videoHeight

      canvasCurrent.width = videoWidth
      canvasCurrent.height = videoHeight

      const dts = await model.detect(video)
      const ctx = canvasCurrent.getContext("2d")
      frame(dts, ctx)
    }
  };

  useEffect(()=>{
    predict()
  }, [])

  return (
    <Wrapper>
      <VideoBlock>
        <Webcam
          audio={false}
          ref={webcamRef}
        />
        <Canvas
          ref={canvasRef}
        />
      </VideoBlock>
    </Wrapper>
  )
}

export default App;