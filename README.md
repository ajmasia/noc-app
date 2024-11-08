# Instalaciones básicas para el inicio de un proyecto en Typescript

1. Iniciallizamos el proyecto con npm

```bash
npm init -y
```

2. Instalamos typescript y algunas dependencias

```bash
npm i -D typescript @types/node ts-node nodemon rimraf

# whithout nodemon
npm i -D typescript @types/node ts-node-dev rimraf

```

3. Inicializamos typescript

```bash
npx tsc --init --outDir dist --rootDir src --target ES2022
```

4. Creamos el fichero de configuración de nodemon

```bash
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

5. Añadimos alguna configuración extra a typescript

```
  "exclude": ["node_modules"],
  "include": ["src/**/*"],
```

6. Añadimos los scripts de ejecución en el package.json

```json
"sripts": {
  "start": "npm run build && node dist/app.js",
  "build": "rimraf ./dist && tsc",
  "dev": "nodemon"
}
// Withou nodemon
"sripts": {
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
}

```

7. Instalación del entorno de testing

```bash
npm install -D jest @types/jest ts-jest supertest
```

8. En el archivo jest.config.js configurar

```bash
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

9. Crear script de test en package.json

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
}
```
