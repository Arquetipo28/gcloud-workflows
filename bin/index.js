#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_1 = require("./commands/deploy");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
yargs(hideBin(process.argv))
    .command('deploy', 'deploy a workflow based on a yml configuration file', (yargs) => {
}, (argv) => {
    deploy_1.default(argv);
})
    .option('path', {
    alias: 'p',
    type: 'string',
    description: 'absolute path of yaml file with workflows definition'
})
    .argv;
//# sourceMappingURL=index.js.map