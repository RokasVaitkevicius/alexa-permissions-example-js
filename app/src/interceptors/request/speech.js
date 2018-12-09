import Speech from 'ssml-builder'

const RequestInterceptor = {
  async process(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    requestAttributes.speech = new Speech()
    requestAttributes.reprompt = new Speech()
    handlerInput.attributesManager.setRequestAttributes(requestAttributes)
  },
}

export default RequestInterceptor
