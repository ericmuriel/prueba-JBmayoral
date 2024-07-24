const nextJest = require('next/jest');
const { compilerOptions } = require('./tsconfig.json'); // Asegúrate de que la ruta es correcta

const createJestConfig = nextJest({
  // Define el entorno de prueba y el preset
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Configuración de Jest para Next.js
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Asegúrate de que esta ruta es correcta
    },
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
});

// Mapea los alias de TypeScript a Jest
const moduleNameMapper = Object.keys(compilerOptions.paths).reduce((acc, key) => {
  const path = compilerOptions.paths[key];
  return {
    ...acc,
    [`^${key.replace('*', '(.*)')}$`]: path.map((p) => `<rootDir>/src/${p.replace('*', '$1')}`),
  };
}, {});

// Configuración personalizada de Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper,
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};

// Exporta la configuración de Jest
module.exports = createJestConfig(customJestConfig);
