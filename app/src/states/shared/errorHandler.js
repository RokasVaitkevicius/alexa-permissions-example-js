const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    const { attributesManager } = handlerInput
    const { speech } = attributesManager.getRequestAttributes()

    console.log(JSON.stringify(error, null, 2))
    speech.say('Something bad happened. Please try to restart the skill.')

    return handlerInput.responseBuilder
      .speak(speech.ssml(true))
      .withShouldEndSession(true)
      .getResponse()
  },
}

export default ErrorHandler
