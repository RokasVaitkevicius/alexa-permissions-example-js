import { missingUserPermissions } from '../../helpers'

const PermissionsIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest'
      && request.intent.name === 'PermissionsIntent'
  },
  async handle(handlerInput) {
    const {
      responseBuilder,
      attributesManager,
      requestEnvelope,
      serviceClientFactory,
    } = handlerInput

    const { speech, reprompt } = attributesManager.getRequestAttributes()
    const { user } = requestEnvelope.context.System
    const { deviceId } = requestEnvelope.context.System.device

    speech.say('This is permissions intent.')
    reprompt.say('Permissions intent reprompt')

    if (!user.permissions || !user.permissions.consentToken) {
      speech.say('Consent token is not available. Card added to give me missing permissions.')
      return responseBuilder
        .speak(speech.ssml(true))
        .reprompt(reprompt.ssml(true))
        .withAskForPermissionsConsentCard(missingUserPermissions())
        .getResponse()
    }

    const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient()
    const upsServiceClient = serviceClientFactory.getUpsServiceClient()

    const servicesPromiseArray = [
      deviceAddressServiceClient.getFullAddress(deviceId),
      upsServiceClient.getProfileEmail(),
      upsServiceClient.getProfileName(),
      upsServiceClient.getProfileMobileNumber(),
    ]

    const [address, email, name, mobileNumber] = await Promise
      .all(servicesPromiseArray
        .map(p => p.catch(e => e.response.code)))

    const userData = {
      address,
      email,
      name,
      mobileNumber,
    }

    const missingPermissions = missingUserPermissions(userData)

    if (missingPermissions.length > 0) {
      speech.say('Some permissions are missing. Permssions card is displayed.')
      responseBuilder.withAskForPermissionsConsentCard(missingPermissions)
    } else {
      speech.say('All permissions are given. User info is displayed in the card.')
      responseBuilder.withSimpleCard('User info', JSON.stringify(
        userData,
        (k, v) => (v === undefined ? null : v),
        2,
      ))
    }

    return responseBuilder
      .speak(speech.ssml(true))
      .reprompt(reprompt.ssml(true))
      .getResponse()
  },
}

export default PermissionsIntent
