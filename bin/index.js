#!/usr/bin/env node
import { program } from 'commander';

import { work } from '../src/commands/work.js'
import { rest } from '../src/commands/rest.js'


program.name('pomo')
    .description('Pomodoro in terminal')
    .version('1.0.0');

// Define the 'work' command
program
    .command('work')
    .description('Start a Pomodoro Session')
    .option('-t, --time <minutes>', 'length of session (mins)', '25')
    .action((options) => {
        // Place your work-related logic here
        const time = parseInt(options.time, 10);
        work(time * 60, 'work');
    });


program
    .command('rest')
    .description('Start a rest Session')
    .option('-l, --long', 'long rest session (25 mins)')
    .option('-s, --short', 'short rest session (5 mins)')
    .option('-t, --time <minutes>', 'custom length of rest session (mins)')
    .action((options) => {
        let time;
        if (options.long) {
            time = 25; // Default to 25 minutes for long rest
        } else if (options.short) {
            time = 5; // Default to 5 minutes for short rest
        } else if (options.time) {
            time = parseInt(options.time, 10);
        } else {
            // If no option is provided, default to a short break of 5 minutes
            time = 5;
        }
        // min to sec
        rest(time * 60, 'rest');
    });




program.parse(process.argv);

