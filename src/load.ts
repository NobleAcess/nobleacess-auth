import * as faceapi from 'face-api.js';

export async function Run() {

  const loadPath = './public/models';

  Promise.all([
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(loadPath),
    await faceapi.nets.faceLandmark68Net.loadFromDisk(loadPath),
    await faceapi.nets.faceRecognitionNet.loadFromDisk(loadPath)
  ]).then(() => {
    console.log('models loaded')
  })
}