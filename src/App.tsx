import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isWebGPUAvailable } from "./utils/Constants";

// Lazy load the appropriate transcription app based on WebGPU availability
const WebGPUApp = lazy(() => import("./webgpu/App"));
const WASMApp = lazy(() => import("./wasm/App"));
const AudioSplitterPage = lazy(() => import("./splitter/AudioSplitterPage"));

function LoadingScreen() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-lg text-slate-600'>Loading...</p>
            </div>
        </div>
    );
}

function TranscriptionApp() {
    return isWebGPUAvailable ? <WebGPUApp /> : <WASMApp />;
}

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path='/' element={<TranscriptionApp />} />
                    <Route
                        path='/audio-splitter'
                        element={<AudioSplitterPage />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
