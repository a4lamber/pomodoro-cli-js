import { runProgressBar } from '../utils/progressBar.js';

export function work(totalDuration, message) {
    runProgressBar(totalDuration, message);
}