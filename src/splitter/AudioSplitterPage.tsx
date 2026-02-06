import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    splitAudioFile,
    formatDuration,
    formatFileSize,
    AudioSplit,
} from "../utils/audioSplitter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AudioSplitterPage() {
    const [file, setFile] = useState<File | null>(null);
    const [audioDuration, setAudioDuration] = useState<number>(0);
    const [isLoadingDuration, setIsLoadingDuration] = useState(false);
    const [numberOfParts, setNumberOfParts] = useState<number>(2);
    const [splits, setSplits] = useState<AudioSplit[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = useCallback(
        async (selectedFile: File) => {
            setError(null);
            setSplits([]);
            setProgress(0);
            setAudioDuration(0);

            // Validate file type
            if (!selectedFile.type.startsWith("audio/") && !selectedFile.type.startsWith("video/")) {
                setError("Please select a valid audio file.");
                return;
            }

            setFile(selectedFile);
            setIsLoadingDuration(true);

            // Get duration
            try {
                const audioContext = new AudioContext();
                const arrayBuffer = await selectedFile.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                setAudioDuration(audioBuffer.duration);
                await audioContext.close();
            } catch {
                setError(
                    "Could not read audio file. Please make sure it's a valid audio format.",
                );
                setFile(null);
            } finally {
                setIsLoadingDuration(false);
            }
        },
        [],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) {
                handleFileSelect(droppedFile);
            }
        },
        [handleFileSelect],
    );

    const handleSplit = async () => {
        if (!file) return;
        setIsProcessing(true);
        setError(null);
        setSplits([]);
        setProgress(0);

        try {
            // Simulate progress (since the actual splitting doesn't have progress callbacks)
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 5, 90));
            }, 200);

            const result = await splitAudioFile(file, numberOfParts);

            clearInterval(progressInterval);
            setProgress(100);
            setSplits(result);
        } catch {
            setError(
                "An error occurred while splitting the audio. Please try again.",
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadSplit = (split: AudioSplit) => {
        const url = URL.createObjectURL(split.blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = split.filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadAll = () => {
        splits.forEach((split, i) => {
            setTimeout(() => downloadSplit(split), i * 300);
        });
    };

    const reset = () => {
        setFile(null);
        setAudioDuration(0);
        setIsLoadingDuration(false);
        setSplits([]);
        setProgress(0);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <main
                className='flex-1 py-8 px-4'
                style={{ backgroundColor: "#ffffff" }}
            >
                <div className='max-w-3xl mx-auto'>
                    <div className='text-center mb-8'>
                        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl'>
                            Free Online Audio Splitter
                        </h1>
                        <h2 className='mt-3 mb-5 px-4 text-center text-lg font-semibold tracking-tight text-slate-600 sm:text-xl'>
                            Split your audio files into multiple parts right in
                            your browser. No uploads, no signups.
                        </h2>
                        <p className='text-sm text-slate-500'>
                            Having trouble transcribing long audio files?{" "}
                            <Link
                                to='/'
                                className='text-blue-600 hover:underline font-medium'
                            >
                                Split them first
                            </Link>
                            , then transcribe each part.
                        </p>
                    </div>

                    {/* File Upload Area */}
                    {!file && (
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                                isDragging
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-300 hover:border-slate-400"
                            }`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className='text-5xl mb-4'>🎵</div>
                            <p className='text-lg font-medium text-slate-700'>
                                Drag & drop your audio file here
                            </p>
                            <p className='text-sm text-slate-500 mt-2'>
                                or click to browse
                            </p>
                            <p className='text-xs text-slate-400 mt-3'>
                                Supports MP3, WAV, OGG, FLAC, M4A, WEBM, and
                                more
                            </p>
                            <input
                                ref={fileInputRef}
                                type='file'
                                accept='audio/*,video/*'
                                className='hidden'
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleFileSelect(f);
                                }}
                            />
                        </div>
                    )}

                    {/* File Info & Controls */}
                    {file && (
                        <div className='bg-white rounded-xl shadow-lg shadow-black/5 ring-1 ring-slate-700/10 p-6'>
                            {/* File details */}
                            <div className='flex items-center justify-between mb-6'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl'>
                                        🎵
                                    </div>
                                    <div>
                                        <p className='font-semibold text-slate-800'>
                                            {file.name}
                                        </p>
                                        <p className='text-sm text-slate-500'>
                                            {formatFileSize(file.size)} •{" "}
                                            {isLoadingDuration ? (
                                                <span className='inline-flex items-center gap-1'>
                                                    <span className='animate-spin inline-block w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full'></span>
                                                    Reading audio...
                                                </span>
                                            ) : (
                                                <>Duration: {formatDuration(audioDuration)}</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={reset}
                                    className='text-sm text-slate-500 hover:text-slate-700 px-3 py-1 rounded-md hover:bg-slate-100'
                                >
                                    ✕ Remove
                                </button>
                            </div>

                            {/* Number of parts selector */}
                            {splits.length === 0 && (
                                <div className='mb-6'>
                                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                                        Split into how many parts?
                                    </label>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            type='range'
                                            min='2'
                                            max='20'
                                            value={numberOfParts}
                                            onChange={(e) =>
                                                setNumberOfParts(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className='flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
                                            disabled={isProcessing || isLoadingDuration}
                                        />
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() =>
                                                    setNumberOfParts(
                                                        Math.max(
                                                            2,
                                                            numberOfParts - 1,
                                                        ),
                                                    )
                                                }
                                                disabled={
                                                    isProcessing ||
                                                    isLoadingDuration ||
                                                    numberOfParts <= 2
                                                }
                                                className='w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-50'
                                            >
                                                −
                                            </button>
                                            <span className='w-10 text-center font-bold text-lg text-slate-800'>
                                                {numberOfParts}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setNumberOfParts(
                                                        Math.min(
                                                            20,
                                                            numberOfParts + 1,
                                                        ),
                                                    )
                                                }
                                                disabled={
                                                    isProcessing ||
                                                    isLoadingDuration ||
                                                    numberOfParts >= 20
                                                }
                                                className='w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-50'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {isLoadingDuration ? (
                                        <p className='text-xs text-slate-500 mt-2 flex items-center gap-1'>
                                            <span className='animate-spin inline-block w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full'></span>
                                            Reading audio duration...
                                        </p>
                                    ) : (
                                        <p className='text-xs text-slate-500 mt-2'>
                                            Each part will be approximately{" "}
                                            <strong>
                                                {formatDuration(
                                                    audioDuration / numberOfParts,
                                                )}
                                            </strong>{" "}
                                            long
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Progress bar */}
                            {isProcessing && (
                                <div className='mb-6'>
                                    <div className='flex justify-between text-sm text-slate-600 mb-1'>
                                        <span>Splitting audio...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className='w-full bg-slate-200 rounded-full h-3'>
                                        <div
                                            className='bg-blue-600 h-3 rounded-full transition-all duration-300'
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Split button */}
                            {splits.length === 0 && !isProcessing && (
                                <button
                                    onClick={handleSplit}
                                    disabled={isLoadingDuration}
                                    className='w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg'
                                >
                                    {isLoadingDuration ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <span className='animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full'></span>
                                            Reading audio file...
                                        </span>
                                    ) : (
                                        <>✂️ Split into {numberOfParts} Parts</>
                                    )}
                                </button>
                            )}

                            {/* Error */}
                            {error && (
                                <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm'>
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Results */}
                    {splits.length > 0 && (
                        <div className='mt-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-bold text-slate-800'>
                                    ✅ Split Complete — {splits.length} Parts
                                </h3>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={downloadAll}
                                        className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition-colors'
                                    >
                                        ⬇️ Download All
                                    </button>
                                    <button
                                        onClick={reset}
                                        className='px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg text-sm transition-colors'
                                    >
                                        Split Another
                                    </button>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                {splits.map((split) => (
                                    <div
                                        key={split.index}
                                        className='flex items-center justify-between bg-white rounded-lg p-4 shadow-sm ring-1 ring-slate-700/10'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-blue-600'>
                                                {split.index}
                                            </div>
                                            <div>
                                                <p className='font-medium text-slate-800'>
                                                    {split.filename}
                                                </p>
                                                <p className='text-sm text-slate-500'>
                                                    {formatDuration(
                                                        split.startTime,
                                                    )}{" "}
                                                    →{" "}
                                                    {formatDuration(
                                                        split.endTime,
                                                    )}{" "}
                                                    •{" "}
                                                    {formatDuration(
                                                        split.duration,
                                                    )}{" "}
                                                    •{" "}
                                                    {formatFileSize(
                                                        split.blob.size,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                downloadSplit(split)
                                            }
                                            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors'
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* CTA to transcribe */}
                            <div className='mt-6 p-5 bg-blue-50 rounded-xl border border-blue-200 text-center'>
                                <p className='text-blue-800 font-medium'>
                                    Now you can transcribe each part!
                                </p>
                                <p className='text-blue-600 text-sm mt-1'>
                                    Use our free transcription tool to convert
                                    each audio part to text.
                                </p>
                                <Link
                                    to='/'
                                    className='inline-block mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors'
                                >
                                    🎙️ Go to Transcript Generator
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* SEO Content Section */}
            <section className='py-12 px-4' style={{ backgroundColor: "#f8fafc" }}>
                <div className='max-w-3xl mx-auto'>
                    <h2 className='text-2xl font-bold text-slate-800 mb-6 text-center'>
                        How to Split Audio Files Online for Free
                    </h2>
                    <div className='grid md:grid-cols-3 gap-6 mb-10'>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>📁</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>
                                1. Upload Audio
                            </h3>
                            <p className='text-slate-600 text-sm'>
                                Drag & drop or browse for your audio file. Supports MP3, WAV, OGG, FLAC, M4A, and more.
                            </p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>✂️</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>
                                2. Choose Parts
                            </h3>
                            <p className='text-slate-600 text-sm'>
                                Select how many equal parts you want. Split into 2, 5, 10, or up to 20 segments.
                            </p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>⬇️</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>
                                3. Download
                            </h3>
                            <p className='text-slate-600 text-sm'>
                                Download each part individually or all at once. Files are saved as WAV format.
                            </p>
                        </div>
                    </div>

                    <h3 className='text-xl font-semibold text-slate-800 mb-4 text-center'>
                        Why Use Our Free Audio Splitter?
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4 mb-10'>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>100% Free</strong>
                                <p className='text-slate-600 text-sm'>No limits, no subscriptions, no hidden fees</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>Private & Secure</strong>
                                <p className='text-slate-600 text-sm'>Audio never leaves your browser - 100% local processing</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>No Upload Required</strong>
                                <p className='text-slate-600 text-sm'>Everything happens in your browser, no server needed</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>No Signup Required</strong>
                                <p className='text-slate-600 text-sm'>Start splitting immediately - no account needed</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>Multiple Formats</strong>
                                <p className='text-slate-600 text-sm'>Supports MP3, WAV, OGG, FLAC, M4A, WEBM, and more</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>Works with Transcription</strong>
                                <p className='text-slate-600 text-sm'>Split long audio files, then transcribe each part</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section for SEO */}
                    <h3 className='text-xl font-semibold text-slate-800 mb-4 text-center'>
                        Frequently Asked Questions
                    </h3>
                    <div className='space-y-4'>
                        <div className='bg-white p-5 rounded-lg shadow-sm'>
                            <h4 className='font-semibold text-slate-800 mb-2'>
                                What audio formats are supported?
                            </h4>
                            <p className='text-slate-600 text-sm'>
                                Our audio splitter supports all major audio formats including MP3, WAV, OGG, FLAC, M4A, AAC, and WEBM. Any format that your browser can play can be split.
                            </p>
                        </div>
                        <div className='bg-white p-5 rounded-lg shadow-sm'>
                            <h4 className='font-semibold text-slate-800 mb-2'>
                                Is my audio uploaded to a server?
                            </h4>
                            <p className='text-slate-600 text-sm'>
                                No! Your audio file is processed entirely in your browser using the Web Audio API. No data is ever sent to any server, making it completely private and secure.
                            </p>
                        </div>
                        <div className='bg-white p-5 rounded-lg shadow-sm'>
                            <h4 className='font-semibold text-slate-800 mb-2'>
                                What is the maximum file size?
                            </h4>
                            <p className='text-slate-600 text-sm'>
                                Since everything runs in your browser, the limit depends on your device's memory. Most modern devices can handle files up to several hundred megabytes without issues.
                            </p>
                        </div>
                        <div className='bg-white p-5 rounded-lg shadow-sm'>
                            <h4 className='font-semibold text-slate-800 mb-2'>
                                Why should I split audio before transcribing?
                            </h4>
                            <p className='text-slate-600 text-sm'>
                                Very long audio files can sometimes cause issues with browser-based transcription due to memory limitations. Splitting your audio into smaller parts ensures reliable transcription and allows you to transcribe each part individually.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
