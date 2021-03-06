const {By, Key, until } = require('selenium-webdriver');

describe('Task#13', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Opening main page, click to product and waiting page loading ', async () => {
        let li;
        let title;
        let cart;
        let select;
        let linkText;
        for (let i =0;i<3;i++) {

            await browser.get('http://litecart.stqa.ru/en/');
            await browser.wait(until.titleIs('Online Store | My Store'), 2000);
            li = await browser.findElement(By.css('div#box-most-popular ul>li'));
            await console.log('Нашел товар');
            let productName = await li.findElement(By.css('div.name')).getAttribute('innerText');
            await console.log(productName);

            if (productName==='Green Duck' || productName==='Yellow Duck'){
                title = await productName+' | Subcategory | Rubber Ducks | My Store';
            }
            else title = await productName + ' | Rubber Ducks | My Store';

            await console.log(title);
            await li.click();
            select = await browser.findElements(By.css('select[name^=options]'));
            await browser.wait(until.titleIs(title), 4000);
            cart = await browser.findElement(By.css('div#cart>a.content'));

            if (select.length>0){
                await select[0].click();
                await select[0].sendKeys(Key.ARROW_DOWN,Key.RETURN);
            }
            linkText = await cart.getAttribute('innerText');
            await browser.findElement(By.css('button[name=add_cart_product]')).click();
            linkText = await cart.getAttribute('innerText');

            //for (let i = 0;i<20;i++){
              //  if (linkText=== await cart.getAttribute('innerText')){
                //    await browser.sleep(200);
                //}
                //else break;
            //}await browser.navigate().refresh().then(function () {
              //  browser.wait(until.stalenessOf(cart), 10000/*ms*/);
            //});
            await console.log('Кликнул по ссылке'+'\n');
            await browser.wait(function() {
                return cart.getAttribute('innerText').then(function(elementText) {
                    return elementText !== linkText;
                });
            }, 2000);

        }
        await browser.findElement(By.css('div#cart')).click();

    });


    it('Removing cart items ', async () => {
        let shortcuts = await browser.findElements(By.css('li.shortcut>a'));
        let buttonsCount = await shortcuts.length;
        let removeButtons;
        let cells = await browser.findElements(By.css('table[class^=dataTable] td'));
        let cellsCount;

        for (let i = 0;i<buttonsCount;i++){
            await console.log('Удаляю элемент '+(i+1));
            await console.log('Нашел ячейки таблицы');
            cellsCount = await cells.length;
            removeButtons = await browser.findElements(By.css('button[name=remove_cart_item]'));
            await console.log('Нашел кнопку удаления');
            await browser.wait(until.elementIsEnabled((removeButtons[0]),4000));
            await removeButtons[0].click();
            await console.log('Кликнул по кнопке удаления');

            await browser.wait(function() {
                return browser.findElements(By.css('table[class^=dataTable] td')).then(function(tableRefreshWaiting) {
                    return tableRefreshWaiting.length !== cellsCount;
                });
            }, 2000);

        }
    });


    after(async () => browser.quit());
});