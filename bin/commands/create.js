"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const yaml_1 = require("yaml");
exports.default = (argv) => {
    var _a;
    const executionPath = path_1.isAbsolute(argv.path) ? path_1.dirname(argv.path) : process.cwd();
    const definitionFile = fs_1.readFileSync(path_1.join(executionPath, path_1.basename(argv.path)), 'utf-8');
    const config = yaml_1.parse(definitionFile);
    if (!((_a = config.workflows) === null || _a === void 0 ? void 0 : _a.length))
        return;
    const env = {};
    const configEnvVariables = config.env;
    Object.entries(configEnvVariables).forEach((envVariable) => {
        const [name, value] = envVariable;
        const varValue = value.substring(value.lastIndexOf("{") + 1, value.lastIndexOf("}"));
        env[name] = process.env[varValue];
    });
    config.workflows.forEach((workflow) => {
        const assignationStep = workflow.assignationStep || config.assignationStep;
        const workflowDefinitionPath = path_1.isAbsolute(workflow.source) ? workflow.source : path_1.join(executionPath, path_1.basename(workflow.source));
        const workflowDefinition = fs_1.readFileSync(workflowDefinitionPath, 'utf-8');
        const workflowConfig = yaml_1.parse(workflowDefinition);
        const assignmentStepIndex = workflowConfig.main.steps.findIndex((step) => Object.keys(step)[0] == assignationStep);
        const assignmentStep = workflowConfig.main.steps[assignmentStepIndex];
        assignmentStep[assignationStep].assign.map((variableToAssign) => {
            const entry = Object.entries(variableToAssign)[0];
            const variableKey = entry[0];
            const variableValue = entry[1];
            const varValue = variableValue.substring(variableValue.lastIndexOf("{") + 1, variableValue.lastIndexOf("}"));
            variableToAssign[variableKey] = eval(varValue);
        });
        workflowConfig.main.steps[assignmentStepIndex] = assignmentStep;
        fs_1.writeFileSync(workflowDefinitionPath, yaml_1.stringify(workflowConfig), { encoding: 'utf-8' });
    });
};
//# sourceMappingURL=create.js.map