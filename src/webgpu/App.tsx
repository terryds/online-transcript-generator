import { AudioManager } from "./AudioManager";
import Transcript from "./Transcript";
import { useTranscriber } from "./useTranscriber";

export default function WebGPUApp() {
    const transcriber = useTranscriber();

    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-1 flex justify-center items-center py-8'>
                <div className='container flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
                        Online Transcript Generator
                    </h1>
                    <h2 className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
                        Convert audio to text directly in your browser, for free, forever.
                    </h2>
                    <div className='inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                        <svg className='w-4 h-4 mr-1.5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        WebGPU Accelerated
                    </div>
                    <AudioManager transcriber={transcriber} />
                    <Transcript transcribedData={transcriber.output} />
                </div>
            </main>

            {/* SEO Content Section */}
            <section className='bg-slate-50 py-12 px-4'>
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
                                <strong className='text-slate-800'>GPU Accelerated</strong>
                                <p className='text-slate-600 text-sm'>WebGPU powered for lightning-fast transcription</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-white py-6 px-4 border-t border-slate-200'>
                <div className='max-w-3xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-slate-600'>
                    <span>
                        Support:{" "}
                        <a className='underline hover:text-slate-900' href='mailto:transcript@terrydjony.com'>
                            transcript@terrydjony.com
                        </a>
                    </span>
                    <span className='hidden sm:inline'>•</span>
                    <span>
                        Made with{" "}
                        <a
                            className='underline hover:text-slate-900'
                            href='https://github.com/xenova/transformers.js'
                        >
                            🤗 Transformers.js
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}
