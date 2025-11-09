module.exports = function (plop) {
  plop.setGenerator('resource', {
    description: 'Generate full backend and frontend resource',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name (e.g., user, product, post):'
      }
    ],
    actions: [
      // ================= Backend =================
      // Model
      {
        type: 'add',
        path: 'src/backend/models/{{pascalCase name}}.js',
        templateFile: 'plop-templates/model.hbs'
      },
      // Service
      {
        type: 'add',
        path: 'src/backend/services/{{camelCase name}}Service.js',
        templateFile: 'plop-templates/service.hbs'
      },
      // Controller
      {
        type: 'add',
        path: 'src/backend/controllers/{{camelCase name}}Controller.js',
        templateFile: 'plop-templates/controller.hbs'
      },
      // Route
      {
        type: 'add',
        path: 'src/backend/routes/{{camelCase name}}Routes.js',
        templateFile: 'plop-templates/route.hbs'
      },
      // Auto-import route in app.js
      {
        type: 'modify',
        path: 'src/backend/app.js',
        pattern: /(\/\/ Routes)/g,
        template: "import {{camelCase name}}Routes from './routes/{{camelCase name}}Routes.js';\n$1"
      },
      {
        type: 'modify',
        path: 'src/backend/app.js',
        pattern: /(app\.use\(.*\);[\s\S]*)(\/\/ Root health-check)/,
        template: "$1app.use('/api/{{dashCase name}}s', {{camelCase name}}Routes);\n\n$2"
      },

      // ================= Frontend =================
      // React Component
      {
        type: 'add',
        path: 'src/frontend/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/component.hbs'
      },
      // Component CSS
      {
        type: 'add',
        path: 'src/frontend/components/{{pascalCase name}}/{{pascalCase name}}.css',
        templateFile: 'plop-templates/component-style.hbs'
      },
      // Custom Hook
      {
        type: 'add',
        path: 'src/frontend/hooks/use{{pascalCase name}}.js',
        templateFile: 'plop-templates/hook.hbs'
      },
      // Frontend Service (axios/fetch)
      {
        type: 'add',
        path: 'src/frontend/services/{{camelCase name}}Service.js',
        templateFile: 'plop-templates/service.hbs'
      }
    ]
  });
};
