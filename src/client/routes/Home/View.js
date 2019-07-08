import wasmModule from 'rqrr-wasm';
import React, { useState, useCallback, useRef, useEffect } from 'react';

import { HomeContainer } from './styles';

const Home = () => {
  const videoRef = useRef();
  const [wasm, setWasm] = useState({
    loading: false,
    decode: null,
  });

  const loadWasm = useCallback(() => {
    setWasm({
      loading: true,
    });
    wasmModule.init().then(() => {
      setWasm({
        decode: wasmModule.decode,
        loading: false,
      });
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const decodeFrame = () => {
    const canvas = document.createElement('canvas');
    const scale = 0.25;
    const video = videoRef.current;

    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        const arrayBuffer = reader.result;

        window.ab = arrayBuffer;

        const output = wasm.decode(new Uint8Array(arrayBuffer));

        console.log(output);
      });
      reader.readAsArrayBuffer(blob);
    });
  };

  const wasmLoaded = wasm.loading || wasm.decode;

  return (
    <HomeContainer>
      <div>
        <video autoPlay ref={videoRef} />
        <button type="button" onClick={wasmLoaded ? decodeFrame : loadWasm} disabled={wasm.loading}>
          {wasm.loading ? 'loading wasm file...' : wasm.decode ? 'Decode current frame!' : 'Load wasm file'}
        </button>
      </div>
    </HomeContainer>
  );
};

export default Home;
