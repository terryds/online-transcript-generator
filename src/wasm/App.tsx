import { Link } from "react-router-dom";
import { AudioManager } from "./AudioManager";
import Transcript from "./Transcript";
import { useTranscriber } from "./useTranscriber";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WASMApp() {
    const transcriber = useTranscriber();

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-1 flex justify-center items-center py-8' style={{ backgroundColor: '#ffffff' }}>
                <div className='container flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
                        Online Transcript Generator
                    </h1>
                    <h2 className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
                        Convert audio to text directly in your browser, for free, forever.
                    </h2>
                    <div className='inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                        <svg className='w-4 h-4 mr-1.5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                        </svg>
                        WASM Mode
                    </div>
                    <AudioManager transcriber={transcriber} />
                    <Transcript transcribedData={transcriber.output} />
                </div>
            </main>

            {/* SEO Content Section */}
            <section className='py-12 px-4' style={{ backgroundColor: '#f8fafc' }}>
                <div className='max-w-3xl mx-auto'>
                    <h2 className='text-2xl font-bold text-slate-800 mb-6 text-center'>
                        How to Transcribe Audio Online for Free
                    </h2>
                    <div className='grid md:grid-cols-3 gap-6 mb-10'>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>📁</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>1. Upload or Record</h3>
                            <p className='text-slate-600 text-sm'>Choose an audio file, paste a URL, or record directly from your microphone.</p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>🎯</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>2. Transcribe</h3>
                            <p className='text-slate-600 text-sm'>Click the transcribe button and let our AI process your audio in seconds.</p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='text-3xl mb-3'>💾</div>
                            <h3 className='font-semibold text-slate-800 mb-2'>3. Export</h3>
                            <p className='text-slate-600 text-sm'>Download your transcript as TXT, JSON, or SRT subtitles.</p>
                        </div>
                    </div>

                    {/* Audio Splitter Callout */}
                    <div className='mb-10 p-5 bg-amber-50 rounded-xl border border-amber-200 text-center'>
                        <p className='text-amber-800 font-semibold text-lg'>
                            ✂️ Having trouble with long audio files?
                        </p>
                        <p className='text-amber-700 text-sm mt-1'>
                            If transcription fails or takes too long, try splitting your audio into smaller parts first.
                        </p>
                        <Link
                            to='/audio-splitter'
                            className='inline-block mt-3 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors'
                        >
                            ✂️ Split Audio File
                        </Link>
                    </div>

                    <h3 className='text-xl font-semibold text-slate-800 mb-4 text-center'>
                        Why Use Our Free Transcript Generator?
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4'>
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
                                <strong className='text-slate-800'>90+ Languages</strong>
                                <p className='text-slate-600 text-sm'>Multilingual transcription and translation support</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>No Signup Required</strong>
                                <p className='text-slate-600 text-sm'>Start transcribing immediately - no account needed</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>Multiple Export Formats</strong>
                                <p className='text-slate-600 text-sm'>Export as TXT, JSON, or SRT subtitle files</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='text-green-500 text-xl'>✓</span>
                            <div>
                                <strong className='text-slate-800'>Works Everywhere</strong>
                                <p className='text-slate-600 text-sm'>Compatible with all modern browsers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
