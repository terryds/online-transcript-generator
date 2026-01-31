import { lazy, Suspense } from "react";
import { isWebGPUAvailable } from "./utils/Constants";

// Lazy load the appropriate app based on WebGPU availability
const WebGPUApp = lazy(() => import("./webgpu/App"));
const WASMApp = lazy(() => import("./wasm/App"));

function LoadingScreen() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-lg text-slate-600'>Loading Whisper Web...</p>
                <p className='text-sm text-slate-400 mt-2'>
                    {isWebGPUAvailable ? "WebGPU detected - Loading accelerated version" : "Loading WASM version"}
                </p>
            </div>
        </div>
    );
}

function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            {isWebGPUAvailable ? <WebGPUApp /> : <WASMApp />}
        </Suspense>
    );
}

export default App;
