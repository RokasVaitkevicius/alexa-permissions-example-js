const DeviceInfoIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest'
      && request.intent.name === 'DeviceInfoIntent'
  },
  async handle(handlerInput) {
    const {
      responseBuilder,
      attributesManager,
      requestEnvelope,
      serviceClientFactory,
    } = handlerInput
    const { speech, reprompt } = attributesManager.getRequestAttributes()
    const { deviceId } = requestEnvelope.context.System.device

    const upsServiceClient = serviceClientFactory.getUpsServiceClient()

    const servicesPromiseArray = [
      upsServiceClient.getSystemDistanceUnits(deviceId),
      upsServiceClient.getSystemTemperatureUnit(deviceId),
      upsServiceClient.getSystemTimeZone(deviceId),
    ]

    const [distanceUnits, temperatureUnits, timeZone] = await Promise
      .all(servicesPromiseArray
        .map(p => p.catch(e => e)))

    speech.say('This is device info intent. Device info is displayed in the card.')
    reprompt.say('Device info intent reprompt')

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(reprompt.ssml(true))
      .withSimpleCard('Device Info', JSON.stringify(
        { distanceUnits, temperatureUnits, timeZone },
        (k, v) => (v === undefined ? null : v),
        2,
      ))
      .getResponse()
  },
}

export default DeviceInfoIntent
