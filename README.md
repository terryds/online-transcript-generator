# Whisper Web - Adaptive

ML-powered speech recognition directly in your browser with automatic WebGPU feature detection.

## Features

- **Automatic WebGPU Detection**: The app automatically detects if your browser supports WebGPU and loads the appropriate version:
  - **WebGPU Mode**: Uses GPU acceleration for faster transcription
  - **WASM Mode**: Falls back to WebAssembly for browsers without WebGPU support

- **Multiple Audio Sources**: Load audio from URL, file upload, or record directly in the browser
- **Multilingual Support**: Transcribe audio in 90+ languages
- **Real-time Streaming**: See transcription results as they're generated
- **Export Options**: Export transcripts as TXT or JSON

## Technology Stack

- **React** + **TypeScript** for the UI
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **@huggingface/transformers** for WebGPU-accelerated inference
- **@xenova/transformers** for WASM fallback

## Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## How It Works

The app checks for WebGPU support at runtime using `navigator.gpu`. Based on the result:

1. **WebGPU Available**: Loads the WebGPU-optimized version using `@huggingface/transformers` with GPU acceleration
2. **WebGPU Not Available**: Loads the WASM version using `@xenova/transformers` that runs on CPU

This ensures optimal performance across all browsers while maintaining compatibility with older browsers that don't support WebGPU.

## Supported Models

### WebGPU Mode
- onnx-community/whisper-tiny (120MB)
- onnx-community/whisper-base (206MB)
- onnx-community/whisper-small (586MB)
- onnx-community/whisper-large-v3-turbo (1604MB)
- onnx-community/distil-small.en (538MB) - English only

### WASM Mode
- Xenova/whisper-tiny (41-152MB)
- Xenova/whisper-base (77-291MB)
- Xenova/whisper-small (249MB)
- Xenova/whisper-medium (776MB)
- distil-whisper/distil-medium.en (402MB) - English only
- distil-whisper/distil-large-v2 (767MB) - English only

## Credits

Based on [whisper-web](https://github.com/xenova/whisper-web) by Xenova, using [Transformers.js](https://github.com/xenova/transformers.js).
