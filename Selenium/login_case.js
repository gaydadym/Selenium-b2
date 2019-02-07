// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example test that may be run using Mocha.
 *
 * This example uses the `selenium-webdriver/testing.suite` function, which will
 * automatically run tests against every available WebDriver browser on the
 * current system. Alternatively, you may use the `SELENIUM_BROWSER`
 * environment variable to narrow the scope at runtime.
 *
 * Usage:
 *
 *     # Automatically determine which browsers to run against.
 *     mocha -t 10000 selenium-webdriver/example/google_search_test.js
 *
 *     # Configure tests to only run against Google Chrome.
 *     SELENIUM_BROWSER=chrome \
 *         mocha -t 10000 selenium-webdriver/example/google_search_test.js
 */

const assert = require('assert');
const mocha = require('mocha');
const {Browser, By, Key, until} = require('selenium-webdriver');
const {ignore, suite} = require('selenium-webdriver/testing');

suite(function(env) {
  describe('login case', function() {
    let driver;

    before(async function() {
      // env.builder() returns a Builder instance preconfigured for the
      // envrionment's target browser (you may still define browser specific
      // options if necessary (i.e. firefox.Options or chrome.Options)).
      driver = await env.builder().build();
    });

    it('Litecart autorization', async function() {
      await driver.get('http://localhost/litecart/admin/');
      await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
      await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
      await driver.wait(until.titleIs('My Store'), 2000);
    });

    after(() => driver && driver.quit());
    });
});
