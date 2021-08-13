# GCloud Topics

**Table of contents**
* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)
* [Next Changes](#next-changes)

## Overview

This tool was created with the main purpose of facilitating the deployment process and continuous integration, in addition to proposing a tool to facilitate the management of this resource 🚀

## Installation
```shell
$ npm install -g gcloud-topics
```

## Usage

Currently this package only implements a `create` method

### Create
create method allow you to create one or more topics using a definition yaml file, it receives only a `path` argument

**Sample**
```shell
$ gcloud-topics create --path="/absolute/path/config.yml"
```
**Definition File**

```yaml
project: [gcp-project-id]
topics:
  - name: [topic-name]
    regions: #optional
      - [region-name]
    schema: # optional
      id: [schema-id]
      project: [schema-project-id] 
      encoding: [schema-message-encoding]
```

* `regions` property is an optional array, if it is defined it will restrict the storage of the topic
* `schema` property is optional, if it is defined the topic will look for an existent schema with the specified id

## Next Changes

* Add examples
* Add delete command
* Add update command
* Add tests for each command
* Validate existent topics before creation