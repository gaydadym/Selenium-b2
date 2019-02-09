const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const {done} = require('mocha');

describe('DefaultTest', () => {
    const driver = new Builder().forBrowser('firefox').build();

    it('login_case_firefox', async () => {
        await driver.get('http://localhost/litecart/admin/');
        await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await driver.wait(until.titleIs('My Store'), 2000);
    });

    after(async () => driver.quit());
});