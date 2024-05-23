#!/usr/bin/env node
import { program } from 'commander';

import { work } from '../src/commands/work.js'
import { rest } from '../src/commands/rest.js'

// Define the 'work' command
program
    .command('work')
    .description('Handle work tasks')
    .action(() => {
        // Place your work-related logic here
        work(10, 'work');
    });


program
    .command('rest')
    .description('Start a rest session')
    .action(() => {
        // Place your work-related logic here
        rest(5, 'rest');
    });



// program
//     .version('0.0.1')
//     .description('An example CLI program')
//     .option('-n, --name <name>', 'Your name')
//     .action((option) => { console.log(`Hey, ${option.name}`) });

program.parse(process.argv);

