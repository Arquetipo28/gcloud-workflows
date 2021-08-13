#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./commands/create");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
yargs(hideBin(process.argv))
    .command('create', 'create a workflow based on a yml configuration file', (yargs) => {
}, (argv) => {
    create_1.default(argv);
})
    .option('path', {
    alias: 'p',
    type: 'string',
    description: 'absolute path of yaml file with workflows definition'
})
    .argv;
//# sourceMappingURL=index.js.map