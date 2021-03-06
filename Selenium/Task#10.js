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
        await browser.get('http://localhost/litecart/en/');
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
        let link = await browser.findElement(By.css('div#box-campaigns li>a[class=link]'));
        let productName = await link.getAttribute('title');
        let cellRegPrice = await browser.findElement(By.css('div#box-campaigns s.regular-price'));
        let regPriceColor = await cellRegPrice.getCssValue('color');
        let regPriceTextDecor = await cellRegPrice.getCssValue('Text-Decoration-Line');
        let regularPrice = await browser.findElement(By.css('div#box-campaigns s.regular-price')).getAttribute('textContent');
        let campaignPrice = await browser.findElement(By.css('div#box-campaigns strong.campaign-price')).getAttribute('textContent');
        let cellCamPrice = await browser.findElement(By.css('div#box-campaigns strong.campaign-price'));
        let camPriceTextDecor = await cellCamPrice.getCssValue('font-weight');
        let camPriceColor = await cellCamPrice.getCssValue('color');
        let pageTitle = productName+' | Subcategory | Rubber Ducks | My Store';
        await link.click();
        await browser.wait(until.titleIs(pageTitle), 2000);
        let productPageName = await browser.findElement(By.css('h1')).getAttribute('textContent');
        if (productName===productPageName) await console.log('ОК. Название товара на главной и странице товара совпадают');
        else await console.log('ВНИМАНИЕ, НАЗВАНИЯ ТОВАРОВ НЕ СООТВЕТСТВУЮТ!!!');
        let productPageRegPrice = await browser.findElement(By.css('div.information s.regular-price')).getAttribute('textContent');
        let productPageCamPrice = await browser.findElement(By.css('div.information strong.campaign-price')).getAttribute('textContent');

        if (regularPrice===productPageRegPrice) await console.log('ОК. Обычная цена товара на главной и странице товара совпадает.');
        else await console.log('ВНИМАНИЕ, ОБЫЧНАЯ ЦЕНА ТОВАРА НЕ СООТВЕТСТВУЕТ!!!');

        if (campaignPrice===productPageCamPrice) await console.log('ОК. Акционная цена товара на главной и странице товара совпадает');
        else await console.log('ВНИМАНИЕ, АКЦИОННАЯ ЦЕНА ТОВАРА НЕ СООТВЕТСТВУЕТ!!!');

        if (regPriceTextDecor==='line-through') await console.log('ОК. Обычная цена на главной странице зачернкнутая');
        else await console.log('ВНИМАНИЕ, ОБЫЧНАЯ ЦЕНА НА ГЛАВНОЙ СТРАНИЦЕ НЕ ЗАЧЕРКНУТАЯ!!!');

        if ((regPriceColor.substring(5,8)===regPriceColor.substring(10,13))&& regPriceColor.substring(10,13)===regPriceColor.substring(15,18)){
            await console.log('ОК. Обычная цена на главной странице серая');
        }
        else await console.log('ВНИМАНИЕ, ОБЫЧНАЯ ЦЕНА НА ГЛАВНОЙ СТРАНИЦЕ НЕ СЕРАЯ!!!');

        if (regPriceTextDecor!=='line-through') await console.log('ВНИМАНИЕ, ОБЫЧНАЯ ЦЕНА НА ГЛАВНОЙ СТРАНИЦЕ НЕЗАЧЕРНКНУТАЯ!!!');

        let cellProductPageRegPrice = await browser.findElement(By.css('div.information s.regular-price'));
        let regPriceProductColor = await cellProductPageRegPrice.getCssValue('color');
        let productRegPriceTextDecor = await cellProductPageRegPrice.getCssValue('Text-Decoration-Line');

        if (productRegPriceTextDecor==='line-through') await console.log('ОК. Текст обычной цены на странице товара зачеркнутый');
        else await console.log('ВНИМАНИЕ, ТЕКСТ НА СТРАНИЦЕ ТОВАРА НЕ ЗАЧЕРКНУТЫЙ!!!');

        if (((regPriceProductColor.substring(5,8)===regPriceProductColor.substring(10,13))&& regPriceProductColor.substring(10,13)===regPriceProductColor.substring(15,18))){
            await console.log('ОК. Текст обычной цены на странице товара серый');
        }
        else await console.log('ВНИМАНИЕ, ТЕКСТ НА СТРАНИЦЕ ТОВАРА НЕ СЕРЫЙ!!!');

        if (camPriceTextDecor==='700') await console.log('ОК. Текст акционной цены товара на главной странице жирный ');
        else await console.log('ВНИМАНИЕ, ТЕКСТ АКЦИОННОЙ ЦЕНЫ ГЛАВНОЙ СТРАНИЦЕ НЕ ЖИРНЫЙ!!!');
        let productPageCellCamPrice = await browser.findElement(By.css('div.information strong.campaign-price'));
        let productCamPriceTextDecor = await productPageCellCamPrice.getCssValue('font-weight');
        let productCamPriceColor = await productPageCellCamPrice.getCssValue('color');

        if (camPriceColor[10]==='0'&&camPriceColor[13]==='0') await console.log ('ОК. Цвет текста акционной цены на главной красный');
        else await console.log('ВНИМАНИЕ, ТЕКСТ АКЦИОННОЙ ЦЕНЫ ГЛАВНОЙ СТРАНИЦЕ НЕ КРАСНЫЙ!!!');

        if (productCamPriceTextDecor==='700') await console.log('ОК. Текст акционной цены на странице товара жирный ');
        else await console.log('ВНИМАНИЕ, ТЕКСТ АКЦИОННОЙ ЦЕНЫ СТРАНИЦЕ ТОВАРА НЕ ЖИРНЫЙ!!!');

        if (productCamPriceColor[10]==='0'&& productCamPriceColor[13]==='0') await console.log ('ОК. Цвет текста акционной цены на странице товара красный');
        else await console.log('ВНИМАНИЕ, ТЕКСТ АКЦИОННОЙ ЦЕНЫ НА СТРАНИЦЕ ТОВАРА НЕ КРАСНЫЙ!!!');

    });

    after(async () => browser.quit());
});