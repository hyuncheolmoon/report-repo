const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // next.config.js와 .env 파일을 로드하기 위한 Next.js 앱의 경로
  dir: './',
})

// Jest에 적용할 커스텀 설정
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig를 내보내서 next/jest가 비동기 Next.js 설정을 로드할 수 있도록 합니다
module.exports = createJestConfig(customJestConfig) 