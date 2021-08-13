#!/usr/bin/env node

import deploy from './commands/deploy'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .command('deploy', 'deploy a workflow based on a yml configuration file', (yargs) => {
  }, (argv: any) => {
    deploy(argv)
  })
  .option('path', {
    alias: 'p',
    type: 'string',
    description: 'absolute path of yaml file with workflows definition'
  })
  .argv