/**
 * @ Author: Adam Zhang
 * @ Create Time: 2024-05-20 21:18:06
 * @ Modified by: Your name
 * @ Modified time: 2024-05-22 23:28:05
 * @ Description: a progress bar 
 */

import cliProgress from 'cli-progress';
import moment from 'moment';


// Function to run the progress bar
export function runProgressBar(totalDuration, message) {
    if (message === 'rest') {
        console.log("   ___   ");
        console.log("  //_\\_ ");
        console.log(" .\"\\    \".  Doh! Time to rest");
        console.log("/          \\");
        console.log("|           \\_");
        console.log("|       ,--.-.)");
        console.log(" \\     /  o \\o\\");
        console.log(" /\\/\\  \\    /_/");
        console.log(" (_.   `--'__)");
        console.log("   |     .-'  \\");
        console.log("   |  .-'.     )");
        console.log("   | (  _/--.-'");
        console.log("   |  `.___.'");
        console.log("         (");
    }
    else {
        console.log("      /\\  /\\");
        console.log("  ___/  \\/  \\___  \"I\'ll study so hard I\'ll make the old me look like Bart.\"");
        console.log(" |             /");
        console.log(" |            /_");
        console.log(" /     \\_| \\_| /");
        console.log("/     \\/  \\/  \\/");
        console.log("\\     (o   )o  )");
        console.log(" \\ /c  \\__/ --.");
        console.log(" | \\_  ,     -'");
        console.log(" |_ | '\\_______)");
        console.log("   ||      _)");
        console.log("    |     |");
        console.log("    ooooooo");
        console.log("   /       \\");

    }

    const progressBar = new cliProgress.SingleBar({
        format: `{time} - {remaining} | {message} | {bar} | {percentage}% |`,
        //format: customFormatFunction,
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
        const sessionMessage = `${message}ing`
        progressBar.update(elapsedSeconds, {
            time: currentTime,
            remaining: remainingTime,
            message: sessionMessage,
        });

        // exit condition
        if (elapsedSeconds >= totalDuration) {
            clearInterval(interval);
            progressBar.stop();
            console.log(`${message} completed!`);
        }
    }, 1000);
}

// Example usage:
// runProgressBar(10, 'work'); // Run a progress bar for 10 secs


