import { basename, dirname, isAbsolute, join } from 'path'
import { exec } from "child_process"
import { fstat, readFileSync, writeFileSync } from "fs"
import { parse, stringify } from "yaml"

export default (argv) => {
  const executionPath = isAbsolute(argv.path) ? dirname(argv.path) : process.cwd()

  const definitionFile: string = readFileSync(join(executionPath, basename(argv.path)), 'utf-8')
  const config = parse(definitionFile)
  if (!config.workflows?.length) return

  const env = {}
  const configEnvVariables: configEnv = config.env
  Object.entries(configEnvVariables).forEach((envVariable) => {
    const [name, value] = envVariable
    const varValue = value.substring(
      value.lastIndexOf("{") + 1, 
      value.lastIndexOf("}")
    );
    env[name] = process.env[varValue]
  })


  config.workflows.forEach((workflow: Workflow) => {
    const assignationStep: string = workflow.assignationStep || config.assignationStep
    const workflowDefinitionPath: string = isAbsolute(workflow.source) ? workflow.source : join(executionPath, basename(workflow.source))
    const workflowDefinition: string = readFileSync(workflowDefinitionPath, 'utf-8')
    const workflowConfig = parse(workflowDefinition)
    const assignmentStepIndex: number = workflowConfig.main.steps.findIndex((step) => Object.keys(step)[0] == assignationStep)
    const assignmentStep = workflowConfig.main.steps[assignmentStepIndex]

    assignmentStep[assignationStep].assign.map((variableToAssign) => {
      const entry = Object.entries(variableToAssign)[0]
      const variableKey = entry[0]
      const variableValue = entry[1] as string

      const varValue = variableValue.substring(
        variableValue.lastIndexOf("{") + 1, 
        variableValue.lastIndexOf("}")
      );

      variableToAssign[variableKey] = eval(varValue)
    }) 

    workflowConfig.main.steps[assignmentStepIndex] = assignmentStep
    writeFileSync(workflowDefinitionPath, stringify(workflowConfig), { encoding: 'utf-8' })
  })
}