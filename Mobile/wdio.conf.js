/* eslint-disable */
/* 
    Tumblr Package and MainActivity if needed.
    'appium:appPackage': "com.tumblr",
    'appium:appActivity': "com.tumblr.ui.activity.JumpoffActivity",
*/
const isNative = false;
const specFiles = isNative ? './test/specs/**/*.js' : './Flutter/specs/**/chat.spec.js';
const AllureOutputDir = isNative ? 'NativeResults' : 'FlutterResults';
const desiredCapabilities = isNative ? {
    //  Android Native
    "appium:appPackage": "com.cmp.cmplr",
    "appium:appActivity": "com.cmp.cmplr.View.Activities.SplashActivity",
    "appium:automationName": "UiAutomator2",
} : {
    // Flutter
    "appium:appPackage": "cmplr.android",
    "appium:appActivity": "cmplr.android.MainActivity",
    "appium:automationName": "Flutter",
    "appium:retryBackoffTime": 500
};

exports.config = {
    port: 4723,
    path: '/wd/hub/',

    runner: 'local',
    specs: [
        specFiles
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: "Android",
        'appium:platformVersion': "11",
        'appium:udid': "emulator-5554",
        ...desiredCapabilities
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
            outputDir: AllureOutputDir
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}