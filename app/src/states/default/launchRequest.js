const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.session.new
      || handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  async handle(handlerInput) {
    const { responseBuilder, attributesManager } = handlerInput
    const { speech, reprompt } = attributesManager.getRequestAttributes()

    speech.say('Welcome to launch intent.')
    reprompt.say('Launch intent reprompt.')

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(reprompt.ssml(true))
      .getResponse()
  },
}

export default LaunchRequestHandler
