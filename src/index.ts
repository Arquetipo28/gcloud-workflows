#!/usr/bin/env node

import create from './commands/create'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .command('create', 'create a workflow based on a yml configuration file', (yargs) => {
  }, (argv: any) => {
    create(argv)
  })
  .option('path', {
    alias: 'p',
    type: 'string',
    description: 'absolute path of yaml file with workflows definition'
  })
  .argv