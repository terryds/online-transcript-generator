export default function Footer() {
    return (
        <footer
            className='py-6 px-4 border-t'
            style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
        >
            <div className='max-w-3xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-slate-600'>
                <span>
                    Contact:{" "}
                    <a
                        className='underline hover:text-slate-900'
                        href='mailto:transcript@terrydjony.com'
                    >
                        transcript@terrydjony.com
                    </a>
                </span>
                <span className='hidden sm:inline'>•</span>
                <a
                    className='underline hover:text-slate-900'
                    href='https://github.com/terryds/online-transcript-generator'
                >
                    GitHub
                </a>
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
    );
}
