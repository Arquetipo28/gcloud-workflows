# GCloud Workflows

**Table of contents**
* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)
* [Next Changes](#next-changes)

## Overview

This tool was created with the main purpose of facilitating the deployment process and continuous integration, in addition to proposing a tool to facilitate the management of this resource as well as to provide a way to implement environment variables into the workflows deployment process.

## Installation
```shell
$ npm install -g gcloud-workflows
```

## Usage

Currently this package only implements a `deploy` method

### Deploy
built on top of `gcloud deploy`

deploy method allow you to deploy one or more workflows using a definition yaml file, it receives a `path` argument which contains a set of instructions as the project id and the workflows to deploy, each workflow should contain the name or id with which it will be deployed and the source file, which can be either an absolute or relative path.

**Sample**
```shell
$ gcloud-workflows deploy --path="/absolute/path/config.yml"
```
**Definition File**

```yaml
env:
  stage: ${ENV_STAGE_NAME}
  project: ${ENV_PROJECT_NAME}

assignationStep: [string*]

workflows:
  - name: [workflow-name-or-id]
    source: [source-file]
    assignationStep: [optional string]
```

* `assignationStep` property defines the name of the step that will contain the variables assignation, it can be defined globally for all workflows or locally to apply on one specific workflow

**Example Workflow**
```yaml
main:
  params:
    - input
  steps:
    - assignVariables:
        assign:
          - project: ${env.project} # this value will come from the $ENV_STAGE_NAME
          - environment: ${env.stage} # this value will come from the $ENV_PROJECT_NAME
```

## Considerations
* assignationStep property is required, can be global to apply for any workflow or local to apply on a specific one
* variables inside assignation step must be enclosed with `${}`as shown in the [example](#example-workflow)
* if the assignation step contains variables that doesn't have to be parsed they cannot use any of the following characters `${}`
* All workflows must be nested inside a `main` root
* the resultant parsed file will be stored in `/tmp/[workflow-source.yml]`

## Next Changes

* Add examples
* Add tests for deploy command
* Enable root configuration
* Fix tmp file storage