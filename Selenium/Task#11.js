const {By, Key, until } = require('selenium-webdriver');
var numReserve = []
while (numReserve.length < 12) {
    var randomNumber = Math.ceil(Math.random() * 1000);
    var found = false;
    for (var i = 0; i < numReserve.length; i++) {
        if (numReserve[i] === randomNumber){
            found = true;
            break;
        }
    }
    if (!found) { numReserve[numReserve.length]=randomNumber; }
}
let email = 'misha+'+numReserve[1]+'@ya.ru';
let password = 'password'

describe('Task#11', () => {
    let driver = require('selenium-webdriver');
    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Opening main page and registration form', async () => {
        await browser.get('http://localhost/litecart/en/');
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
        await browser.findElement(By.css("a[href*=create_account]")).click();
        await browser.wait(until.titleIs('Create Account | My Store'), 2000);
    });

    it('Filling fields', async () => {
        var numReserve = []
        while (numReserve.length < 12) {
            var randomNumber = Math.ceil(Math.random() * 1000);
            var found = false;
            for (var i = 0; i < numReserve.length; i++) {
                if (numReserve[i] === randomNumber){
                    found = true;
                    break;
                }
            }
            if (!found) { numReserve[numReserve.length]=randomNumber; }
        }
        await browser.findElement(By.css("input[name=firstname")).sendKeys('Mikhail');
        await browser.findElement(By.css("input[name=lastname")).sendKeys('Gaidadym');
        await browser.findElement(By.css("input[name=address1")).sendKeys('775 Westminster Avenue APT D5');
        await browser.findElement(By.css("input[name=postcode")).sendKeys('55555');
        await browser.findElement(By.css("select[name=country_code]")).sendKeys('united states');
        await browser.findElement(By.css("input[name=city]")).sendKeys('New York');
        await browser.findElement(By.css("input[name=email]")).sendKeys(email);
        await browser.findElement(By.css("input[name=phone]")).sendKeys('+12121234567');
        await browser.findElement(By.css("input[name=newsletter]")).click();
        await browser.findElement(By.css("input[name=password]")).sendKeys('password');
        await browser.findElement(By.css("input[name=confirmed_password]")).sendKeys('password');
        await browser.findElement(By.css("button[name=create_account]")).click();
        await browser.findElement(By.css("input[name=password]")).sendKeys(password);
        await browser.findElement(By.css("input[name=confirmed_password]")).sendKeys(password);
        await browser.findElement(By.css("button[name=create_account]")).click();
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
        await browser.findElement(By.css("a[href*=logout]")).click();
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
        await browser.findElement(By.css("input[name=email]")).sendKeys(email);
        await browser.findElement(By.css("input[name=password]")).sendKeys(password, Key.RETURN);
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
        await browser.findElement(By.css("a[href*=logout]")).click();
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);


    });

    after(async () => browser.quit());
});