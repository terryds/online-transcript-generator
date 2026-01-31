function padTime(time: number) {
    return String(time).padStart(2, "0");
}

export function formatAudioTimestamp(time: number) {
    const hours = (time / (60 * 60)) | 0;
    time -= hours * (60 * 60);
    const minutes = (time / 60) | 0;
    time -= minutes * 60;
    const seconds = time | 0;
    return `${hours ? padTime(hours) + ":" : ""}${padTime(minutes)}:${padTime(
        seconds,
    )}`;
}

/**
 * Formats time in seconds to SRT timestamp format: HH:MM:SS,mmm
 */
export function formatSRTTimestamp(time: number) {
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    const minutes = Math.floor(time / 60);
    time -= minutes * 60;
    const seconds = Math.floor(time);
    const milliseconds = Math.round((time - seconds) * 1000);
    
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)},${String(milliseconds).padStart(3, "0")}`;
}
