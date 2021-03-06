const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const {done} = require('mocha');

describe('DefaultTest', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    driver = new driver.Builder().withCapabilities(chromeCapabilities).build();


    it('login_case_chrome', async () => {
        await driver.get('http://localhost/litecart/admin/');
        await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await driver.wait(until.titleIs('My Store'), 2000);
    });

    after(async () => driver.quit());
});