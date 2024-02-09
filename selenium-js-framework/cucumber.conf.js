import { setWorldConstructor, After, Before, Status } from '@cucumber/cucumber';
import { Builder } from 'selenium-webdriver';
import 'chromedriver';

// class CustomWorld {
//     constructor() {
//         this.driver = new Builder().forBrowser('chrome').build();
//     }
// }

// setWorldConstructor(CustomWorld);

Before(function () {
    return this.driver.manage().window().maximize();
});

After(function (scenario) {
    return this.driver.quit();
});