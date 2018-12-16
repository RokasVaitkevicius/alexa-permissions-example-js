const USER_PERMISSIONS = {
  address: 'read::alexa:device:all:address',
  email: 'alexa::profile:email:read',
  name: 'alexa::profile:name:read',
  mobileNumber: 'alexa::profile:mobile_number:read',
}

function missingUserPermissions(userData = {}) {
  return Object.keys(userData).length === 0
    ? Object.values(USER_PERMISSIONS)
    : Object.keys(userData)
      .filter(k => userData[k] === 'ACCESS_DENIED')
      .map(k => USER_PERMISSIONS[k])
}

export default missingUserPermissions
