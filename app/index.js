import * as Alexa from 'ask-sdk'
import defaultHandlers from './src/states/default'
import sharedHandlers from './src/states/shared'
import errorHandler from './src/states/shared/errorHandler'
import requestInterceptors from './src/interceptors/request'
import responseInterceptors from './src/interceptors/response'

const skillBuilder = Alexa.SkillBuilders.standard()

exports.handler = skillBuilder
  .addRequestHandlers(...defaultHandlers, ...sharedHandlers)
  .addErrorHandlers(errorHandler)
  .addRequestInterceptors(...requestInterceptors)
  .addResponseInterceptors(...responseInterceptors)
  .lambda()
