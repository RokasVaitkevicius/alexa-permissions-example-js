const fs = require('fs')

const localPackageJson = require('../package.json')
const lambdaPackageJson = require('../lambda/custom/package.json')

Object.assign(lambdaPackageJson.dependencies, localPackageJson.dependencies)

fs.writeFileSync('./lambda/custom/package.json', JSON.stringify(lambdaPackageJson, null, 2))
