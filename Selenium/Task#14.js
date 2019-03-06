const {By, Key, until } = require('selenium-webdriver');

describe('Task#14', () => {
    let driver = require('selenium-webdriver');
    let newWindow;
    let existingWindows;
    let allWindows;
    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Opening administration panel and autorization', async () => {
        await browser.get('http://localhost/litecart/admin/');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await browser.wait(until.titleIs('My Store'), 2000);
    });

    it('Opening counties page and adding new country', async () => {
        await browser.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        await browser.wait(until.titleIs('Countries | My Store'), 2000);
        await browser.findElement(By.css('a.button')).click();
        await browser.wait(until.titleIs('Add New Country | My Store'), 2000);
    });

    it('Cheking opening pages in new blanks', async () => {
        let originalWindow = await browser.getWindowHandle();
        existingWindows = await browser.getAllWindowHandles();
        let links = await browser.findElements(By.css('i[class*=external-link]'));
        let linksCount = links.length;
        for (let i=0;i<linksCount;i++){
            links = await browser.findElements(By.css('i[class*=external-link]'));
            existingWindows = await browser.getAllWindowHandles();
            await links[i].click();
            newWindow = await browser.wait(async function ThereIsWindowOtherThan () {
                allWindows = await browser.getAllWindowHandles();
                let j = 0;
                while (true) {
                    if (existingWindows.includes(allWindows[j])) j++;
                    else {
                        console.log('Возвращаю адрес нового окна '+allWindows[j]);
                        return allWindows[j];

                    }
                }
            }, 10000);
            await browser.switchTo().window(newWindow);
            await console.log('Переключился в '+(i+1)+' новое окно');
            await browser.close(newWindow);
            await browser.switchTo().window(originalWindow);
            await console.log('Вернулся в первоначальное окно');
        }
    });

    after(async () => browser.quit());
});