/**
 * @ Author: Adam Zhang
 * @ Create Time: 2024-05-20 21:18:06
 * @ Modified by: Your name
 * @ Modified time: 2024-05-20 22:47:26
 * @ Description: a progress bar 
 */

// dependencies
const cliProgress = require('cli-progress');
const moment = require('moment');


// 
function runProgressBar(totalDuration) {
    const progressBar = new cliProgress.SingleBar({
        format: '{time} - {remaining} | Working | {bar} | {percentage}%',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    progressBar.start(totalDuration, 0);

    let elapsedSeconds = 0;

    const interval = setInterval(() => {
        elapsedSeconds += 1;
        const currentTime = moment().format('h:mm:ss A');
        const remainingTime = `${Math.floor((totalDuration - elapsedSeconds) / 60)}m${(totalDuration - elapsedSeconds) % 60}s`;

        progressBar.update(elapsedSeconds, {
            time: currentTime,
            remaining: remainingTime
        });

        if (elapsedSeconds >= totalDuration) {
            clearInterval(interval);
            progressBar.stop();
            console.log('Study completed!');
        }
    }, 1000);
}

// Example usage:
module.exports = { runProgressBar }