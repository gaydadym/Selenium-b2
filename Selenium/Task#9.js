const {By, Key, until } = require('selenium-webdriver');

describe('DefaultTest', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();
    let links = [];

    it('Task#9. Opening country list and autorization', async () => {
        await browser.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await browser.wait(until.titleIs('Countries | My Store'), 2000);
    });

    it('Task#9. Sort checking', async()=> {
        let elements = await browser.findElements(By.css("td>a"));
        let len = elements.length;
        console.log(elements.length);
        let i = 0;
        let s = await elements[0].getAttribute('text');
        let sortIsCorrect = true;
        let attr;
        for (i;i<len;i++) {
            attr = await elements[i].getAttribute('text');
            if (attr!='') {
                console.log('Аттрибут равен '+ attr);
                if (attr>=s) {
                    s = await elements[i].getAttribute('text');
                }
                else sortIsCorrect=false;


          }
        }
        if (sortIsCorrect===true) console.log('Sorting is OK'+'\n'+'=============================================='+'\n');
        else console.log('TEST FAILED. SORTING IS WRONG!!!'+'\n'+'==============================================');

    });

    it('Task#9. Checking geozones count', async()=> {
        let cell;
        let rows = await browser.findElements(By.css("tr.row"));
        let cells;
        let i = 0;
        cells = await rows[i].findElements(By.css("td"));
        let l = rows.length;
        let k = cells.length;
        for (i;i<l;i++){
            cells = await rows[i].findElements(By.css("td"));
            for (let j = 0;j<k;j++) {
                cell = cells[j];
                if (await cell.getAttribute("cellIndex")==='5') {
                    if (await cell.getAttribute("outerText")!=='0'){
                        links.push(i);
                        break;
                    }
                }
            }
        }
        if (links.legth===0) await console.log('Не найдены страны, у которых есть геозоны');
        else await console.log('Найдено '+links.length+' стран, у которых есть геозоны.');
    });


    it('Task#9. Geozones sort checking', async()=> {
        let table;
        let cells;
        let countries = [];
        let rows;
        let j=0;
        let cell;
        for (let i=0;i<links.length;i++){
            await console.log('Вошел в первый цикл.');
            await browser.get('http://localhost/litecart/admin/?app=countries&doc=countries');
            await browser.wait(until.titleIs('Countries | My Store'), 2000);
            rows = await browser.findElements(By.css("tr.row"));
            await rows[links[i]].findElement(By.tagName('a')).click();
            await console.log('Кликнул по ссылке');
            await browser.wait(until.titleIs('Edit Country | My Store'), 2000);
            cells = await browser.findElements(By.tagName('table#table-zones>tbody>tr>td'));
            console.log('Нашел ' +await cells.length+' ячеек');
            for (j;j<cells.length;j++) {
                await console.log('Вошел во вложенный цикл.');

                if (await cells[j].getAttribute('cellIndex')==='2'&& await cells[j].getAttribute('textContent')!=='') {
                    await console.log('Нашел ячеку со страной');
                    console.log('Содержимое ячейки '+ await cells[j].getAttribute('textContent'));
                    countries.push(await cells[j].getAttribute('textContent'));
                }
            }
            if (countries===countries.sort()) await console.log('сортировка в таблице правильная');
            else await console.log('сортировка в таблице правильная')
        }
        await console.log('Массив со странами' + countries);
    });

    after(async () => browser.quit());
});