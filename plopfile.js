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
                path: 'app/{{kebabCase name}}/screens/index.tsx',
                templateFile: 'plop_templates/screen.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/services/index.ts',
                template: 'plop_templates/service.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/hooks/index.ts',
                template: 'plop_templates/hook.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/{{kebabCase name}}Routes.ts',
                templateFile: 'plop_templates/routes.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/components/{{pascalCase name}}.tsx',
                templateFile: 'plop_templates/component.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/components/index.ts',
                templateFile: 'plop_templates/component-index.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/__tests__/{{kebabCase name}}.test.tsx',
                templateFile: 'plop_template/component-test.hbs'
            },
            {
                type: 'add',
                path: 'app/{{kebabCase name}}/screens/{{pascalCase name}}.tsx',
                templateFile: 'plop_template/screen.hbs'
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
                templateFile: 'plop_template/component.hbs'
            }
        ]
    })
}