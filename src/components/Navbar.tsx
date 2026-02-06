import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav
            className='py-3 px-4 border-b'
            style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
        >
            <div className='max-w-4xl mx-auto flex items-center justify-between'>
                <Link
                    to='/'
                    className='text-lg font-bold text-slate-800 hover:text-slate-900'
                >
                    🎙️ Online Transcript Generator
                </Link>
                <div className='flex items-center gap-6'>
                    <Link
                        to='/'
                        className={`text-sm font-medium ${
                            location.pathname === "/"
                                ? "text-blue-600"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        Transcribe
                    </Link>
                    <Link
                        to='/audio-splitter'
                        className={`text-sm font-medium ${
                            location.pathname === "/audio-splitter"
                                ? "text-blue-600"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        Audio Splitter
                    </Link>
                </div>
            </div>
        </nav>
    );
}
