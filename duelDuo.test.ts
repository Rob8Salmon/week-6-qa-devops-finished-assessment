import { Builder, Capabilities, By, Key } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    await driver.sleep(2000)
    expect(displayed).toBe(true)
})

test('Add to duo button displays player-duo', async () => {
    const drawBtn = await driver.findElement(By.id('draw'))
    await drawBtn.click()
    await driver.sleep(2000)    
    const addToDuoBtn = await driver.findElement(By.className('bot-btn'))
    await addToDuoBtn.click()
    await driver.sleep(2000)
    // const playerOnDuo = await driver.findElement(By.id('player-duo'))
    // const displayed = playerOnDuo.isDisplayed()
    // await driver.sleep(2000)
    // expect(displayed).toBe(true)
    const playerOnDuo = await driver.findElement(By.xpath('//*[@id="player-duo"]/div'))
    await driver.sleep(2000)
    expect(playerOnDuo).toBeTruthy;
})

test('Remove button working', async () => {
    const drawBtn = await driver.findElement(By.id('draw'))
    await drawBtn.click()
    await driver.sleep(2000)    
    const addToDuoBtn = await driver.findElement(By.className('bot-btn'))
    await addToDuoBtn.click()
    await driver.sleep(2000)

    const removeBtn = await driver.findElement(By.xpath("//button[@id='remove']"))
    const playerOnDuo = await driver.findElement(By.xpath('//*[@id="player-duo"]/div'))

    await removeBtn.click();
    await driver.sleep(2000)


    //*[@id="player-duo"]/div
    await driver.sleep(2000)
    expect(playerOnDuo).toBeNull;
})