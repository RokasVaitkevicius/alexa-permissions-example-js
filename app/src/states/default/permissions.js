const PermissionsIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.PermissionsIntent'
  },
  async handle(handlerInput) {
    const { responseBuilder, attributesManager } = handlerInput
    const { speech, reprompt } = attributesManager.getRequestAttributes()

    speech.say('This is permissions intent')
    reprompt.say('Permissions intent reprompt')

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(speech.ssml(true))
      .withShouldEndSession(true)
      .getResponse()
  },
}

export default PermissionsIntent
