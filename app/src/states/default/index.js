import launchRequest from './launchRequest'
import stopIntent from './stop'
import unhandledIntent from './unhandled'
import helpIntent from './help'
import permissionsIntent from './permissions'
import deviceInfoIntent from './deviceInfo'

export default [
  launchRequest,
  stopIntent,
  helpIntent,
  permissionsIntent,
  deviceInfoIntent,
  unhandledIntent,
]
