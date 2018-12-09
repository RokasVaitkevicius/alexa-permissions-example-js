const SessionEndedRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput
    const { request } = requestEnvelope

    switch (request.reason) {
      case 'EXCEEDED_MAX_REPROMPTS': {
        console.log('User stopped speaking')
        break
      }
      case 'USER_INITIATED': {
        console.log('User said "exit"')
        break
      }
      case 'ERROR': {
        console.log(`Error occured: ${request.error.type}, ${request.error.message}`)
        break
      }
      default: {
        console.log('Somehting is wrong')
      }
    }
    return responseBuilder
      .withShouldEndSession(true)
      .getResponse()
  },
}

export default SessionEndedRequest
