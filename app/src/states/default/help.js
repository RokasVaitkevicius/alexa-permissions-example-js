const HelpIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const { responseBuilder, attributesManager } = handlerInput
    const { speech, reprompt } = attributesManager.getRequestAttributes()

    speech.say('This is help intent.')
    reprompt.say('This is help intent reprompt.')

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(reprompt.ssml(true))
      .getResponse()
  },
}

export default HelpIntent
