/* eslint-disable */
exports.config = {
    port: 4723,
    path: '/wd/hub/',

    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        platformName: "Android",
        'appium:platformVersion': "11",
        'appium:avd': "Pixel",
        'appium:appPackage': "com.cmp.cmplr",
        'appium:appActivity': "com.cmp.cmplr.View.Activities.SplashActivity",
        'appium:automationName': "UiAutomator2",
        'appium:udid': "emulator-5554"
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results'
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
