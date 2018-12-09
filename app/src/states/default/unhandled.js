const UnhandledIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type !== 'SessionEndedRequest'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
  },
  handle(handlerInput) {
    const { responseBuilder, attributesManager } = handlerInput
    const { speech, reprompt } = attributesManager.getRequestAttributes()

    speech.say('This intent is unhandled.')
    reprompt.say('This is unhandled intent reprompt.')

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(reprompt.ssml(true))
      .getResponse()
  },
}

export default UnhandledIntent
