module.exports = function (plop) {
    plop.setGenerator('module', {
        description: 'Add a new microservice module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the module name'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'modules/{{kebabCase name}}/hooks/index.ts',
                templateFile: 'plop_templates/hook.hbs'
            },
            {
                type: 'add',
                path: 'modules/{{kebabCase name}}/components/{{pascalCase name}}Base.tsx',
                templateFile: 'plop_templates/component.hbs'
            },
            {
                type: 'add',
                path: 'modules/{{kebabCase name}}/__tests__/{{kebabCase name}}.test.tsx',
                templateFile: 'plop_templates/component-test.hbs'
            },
            {
                type: 'add',
                path: 'modules/{{kebabCase name}}/screens/{{pascalCase name}}.tsx',
                templateFile: 'plop_templates/screen.hbs'
            }
        ]
    });

    plop.setGenerator('component', {
        description: 'Add a new reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the component name'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'components/{{pascalCase name}}.tsx',
                templateFile: 'plop_templates/component.hbs'
            }
        ]
    })
}