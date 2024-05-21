/**
 * @ Author: Adam Zhang
 * @ Create Time: 2024-05-19 00:09:26
 * @ Modified by: Your name
 * @ Modified time: 2024-05-20 22:34:52
 * @ Description:
 * The logic of Pomodoro is:
 * - pick a task
 * - set a timer (defaults to 25 mins)
 * - when time is up, take a short break (defaults to 5 mins).
 *          Note: 1 work session + 1 rest session 
 * - Every 4th rest, is a longer rest defaults to 15-30 mins
 * Procedures:
 */

const readlineSync = require('readline-sync');
const cliProgress = require('cli-progress');


let Durations = {
    STUDY: 1000,
    SHORT_BREAK: 1000,
    LONG_BREAK: 10000,
}


/**
 * Print out a task once duration expired!
 * @param {*} ms: how long in milisecond
 * @param {*} message 
 */
function Timer(ms, message) {
    return new Promise((resolve, reject) => {
        console.log(`Starting ${message}!!!`)
        setTimeout(() => {
            console.log(`${message} completed!`)
            resolve();
        }, ms);
    });
}

function TimerFactory(durationType) {
    switch (durationType) {
        case 'STUDY':
            return Timer(Durations.STUDY, 'study');
        case 'SHORT_BREAK':
            return Timer(Durations.SHORT_BREAK, 'short break');
        case 'LONG_BREAK':
            return Timer(Durations.LONG_BREAK, 'long break');
        default:
            throw new Error('Invalid duration type');
    }
}



async function Pomodoro() {
    let shortBreaks = 0;
    while (true) {
        readlineSync.question('Type "study" to start a study session: ');
        await TimerFactory('STUDY');

        shortBreaks++;
        if (shortBreaks % 4 === 0 && shortBreaks > 0) {
            console.log('You have earned a long break!');
            readlineSync.question('Type "break" to start your long break: ');
            await TimerFactory('LONG_BREAK');
            shortBreaks = 0; // Reset short break counter after a long break
        } else {
            console.log('You have earned a short break!');
            readlineSync.question('Type "break" to start your short break: ');
            await TimerFactory('SHORT_BREAK');
        }
    }
}

// Pomodoro();

const { runProgressBar } = require('./progressBar');

runProgressBar(5);