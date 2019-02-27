const {By, Key, until } = require('selenium-webdriver');

describe('Task#9.1', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Task#9.1. Opening zone list and autorization', async () => {
        await browser.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);

    });
    it('Task#9.1. Zone sorting checking', async () => {
        await browser.wait(until.titleIs('Geo Zones | My Store'), 4000);
        await  console.log('Дождался загрузки страницы');
        let rows = await browser.findElements(By.css('table.dataTable tr.row'));
        let rowsCount = rows.length;
        let link;
        let selects,selectsCount;
        let geozones = [];
        let option,optionsCount;
        for (let i=0;i<rowsCount;i++){
            await browser.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
            rows = await browser.findElements(By.css('table.dataTable tr.row'));
            link = await rows[i].findElement(By.css('td>a'));
            await link.click();
            await browser.wait(until.titleIs('Edit Geo Zone | My Store'));
            selects = await browser.findElements(By.css('select[name*=zone_code]'));
            await console.log('В таблице найдено '+selects.length+' геозон');
            selectsCount = selects.length;

            for (let j=0;j<selectsCount;j++) {
                option = await selects[j].findElement(By.css('option[selected=selected]'));
                geozones.push(await option.getAttribute('innerText'));
            }

            if (geozones===geozones.sort()) await console.log('Зоны расположены в алфавитном порядке');
            else await console.log('Сортировка в '+(i+1)+ 'стране НАРУШЕНА!!!');
        }
    });


    after(async () => browser.quit());
});