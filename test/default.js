/* eslint-disable */
'use strict'

const valexa = require('virtual-alexa')
const { assert } = require('chai')
const { speech } = require('./helpers')

const locale = 'en-GB'

let alexa
let reply

describe('Default handler test', function () {
  describe('New user', function () {
    this.timeout(20000)

    beforeEach(function () {
      alexa = valexa.VirtualAlexa.Builder()
        .handler('lambda/custom/index.handler')
        .locale(locale)
        .create()
    })

    it('will launch', async function () {
      reply = await alexa.launch()
      assert.include(speech(reply), 'Welcome to launch intent.')
    })
  })
})
