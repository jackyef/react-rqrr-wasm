# react-rqrr-wasm

This is a repo to show an example of how to use [`rqrr-wasm`](https://github.com/jackyef/rqrr-wasm) in your webpack project.

## Steps
1. Overrides webpack default wasm loader (inside client.config.js)
```javascript
// overrides webpack defaultRules, so that webpack doesn't automatically use its own wasm-loader for wasm file.
// we want to use file-loader instead.
defaultRules: [
  {
    type: "javascript/auto",
    resolve: {}
  },
  {
    test: /\.json$/i,
    type: "json"
  },
],
```

2. Use file-loader to load the `.wasm` file, because we only need the url to pass to `wasm_bindgen()` call. (inside client.config.js)
```javascript
test: /\.(png|jpe?g|gif|svg|wasm)$/, 
```

3. Import `./src/client/wasm/index.js` file. (example in ./src/client/routes/Home/View.js)
```javascript
import wasmModule from '../../wasm';

// ...usage with react
const [wasm, setWasm] = useState({
  loading: false,
  decode: null,
});

const loadWasm = () => {
  setWasm({
    loading: true,
  });

  // wasmModule.init() returns a promise. If it's resolved successfully, we can now call wasmModule.decode
  wasmModule.init().then(() => {
    setWasm({
      decode: wasmModule.decode,
      loading: false,
    });
  });
};

// a facade to prepare an Uint8Array before passing it to wasmModule.decode() call
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

```