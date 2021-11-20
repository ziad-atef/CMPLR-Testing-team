import { remote } from 'webdriverio'
import { strictEqual } from 'assert'

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    platformVersion: '11',
    deviceName: 'emulator-5554',
    app: process.cwd() + '/APKs/ApiDemos-debug.apk',
    appPackage: 'io.appium.android.apis',
    appActivity: '.view.TextFields',
    automationName: 'UiAutomator2'
  }
}

async function main () {
  const client = await remote(opts)

  const field = await client.$('android.widget.EditText')
  await field.setValue('Hello World!')
  const value = await field.getText()
  strictEqual(value, 'Hello World!')

  await client.deleteSession()
}
main()
