const { Builder, By, Key, until } = require("selenium-webdriver");

let driver = new Builder().forBrowser("chrome").build();
let protocolo;
let numProtocolo;


async function login() {


    await driver.manage().window().maximize();
    await driver.manage().logs().get("browser");

    await driver.get("http://homologacao.planejamento.mg.gov.br/")

    let inputLogin = await driver.findElement(By.css("#root > div > div.background-logon > div > div.login.container > div > form > div:nth-child(2) > input"))
    await inputLogin.sendKeys(Key.HOME)

    await inputLogin.sendKeys("12164659678")

    let inputSenha = await driver.findElement(By.css("#root > div > div.background-logon > div > div.login.container > div > form > div:nth-child(3) > input"))

    await inputSenha.sendKeys("Seplag@2019", Key.ENTER)

    await driver.manage().setTimeouts({ implicit: 3 });

}
async function alterAssunto() {

    let chamados = await driver.wait(until.elementLocated(By.css("#root > div > div.menu > nav > a:nth-child(2)")), 5000)

    await chamados.click()

    let chamado = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div.container-app > table > tbody > tr:nth-child(2) > td:nth-child(1)")), 5000)
    await chamado.click()

    let inputAssunto = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div:nth-child(5) > div > div.col-sm-10 > div > div.rbt-input-hint-container > input")), 5000)
    await inputAssunto.sendKeys(Key.DOWN, Key.ENTER)


    let bAlterAssunto = await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div:nth-child(5) > div > div:nth-child(3) > button"))

    await bAlterAssunto.click()

    protocolo = await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div.form-group.text-center > label")).getText()
    numProtocolo = protocolo.replace("Protocolo: ", "")

    /*   let fechartostfy = await driver.wait(until.elementLocated(By.css("#root > div > div.Toastify > div")), 3000)
     await fechartostfy.click(); */


}

async function redirecionarChamado() {

    await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div:nth-child(3) > div > div:nth-child(2) > button")).click()

    let selectModalTransfer = await driver.wait(until.elementLocated(By.css('body > div.fade.modal.show > div > div > div.modal-body > form > div.form-row > div:nth-child(1) > select')), 3000)

    await selectModalTransfer.click()
    await selectModalTransfer.findElement(By.css('option[value="117"]')).click()

    let selectModalPrioridade = await driver.wait(until.elementLocated(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > div.form-row > div:nth-child(2) > select")), 1000)
    await selectModalPrioridade.click()
    await selectModalPrioridade.findElement(By.css('option[value="1"]')).click()

    let textAreaModal = await driver.wait(until.elementLocated(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > div.form-group > textarea")), 1000)
    await textAreaModal.sendKeys("Teste Transferencia por teste de integração!")

    await driver.findElement(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > a > button")).click()

    let fechartostfy = await driver.wait(until.elementLocated(By.className('Toastify__toast Toastify__toast--success')), 1000);
    await fechartostfy.click();
}

async function buscarChamado() {

    //await driver.sendKeys(Key.HOME);

    let fechartostfy = await driver.wait(until.elementLocated(By.className('Toastify__toast Toastify__toast--success')), 1000);
    await fechartostfy.click();

    let filterChamado = await driver.wait(until.elementLocated(By.css('#root > div > div.menu > nav > a:nth-child(4) > button')))
    await filterChamado.click()

    let filterProtocolo = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div:nth-child(2) > div.zebraB.filter > form > div:nth-child(2) > div:nth-child(3) > div > input")), 3000)
    await filterProtocolo.sendKeys(numProtocolo, Key.ENTER)
}



async function orquestrador() {


    await login().catch((err) => {
        logError(err);
    });
    await alterAssunto().catch((err) => {
        logError(err);
    });;
    await redirecionarChamado().catch((err) => {
        logError(err);
    });;
    await buscarChamado().catch((err) => {
        logError(err);
    });;

    // await driver.close()

}



function logError(err) {
    console.log(err);
    driver.close();
}

orquestrador();


