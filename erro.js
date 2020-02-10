const { Builder, By, Key, until } = require("selenium-webdriver");

let driver = new Builder().forBrowser("chrome").build();
let protocolo;
let numProtocolo;


async function login() {




    await driver.manage().window().maximize();
    await driver.manage().logs().get("browser");

    await driver.get("http://homologacao.planejamento.mg.gov.br/")

    let inputLogin = await driver.findElement(By.css("#root > div > div.background-logon > div > div.login.container > div > form > div:nth-child(2) > input")).catch((err) => {
        logError(err);
    });
    await inputLogin.sendKeys(Key.HOME)

    await inputLogin.sendKeys("12164659678").catch((err) => {
        logError(err);
    });
    let inputSenha = await driver.findElement(By.css("#root > div > div.background-logon > div > div.login.container > div > form > div:nth-child(3) > input")).catch((err) => {
        logError(err);
    });

    await inputSenha.sendKeys("Seplag@2019", Key.ENTER).catch((err) => {
        logError(err);
    });

    await driver.manage().setTimeouts({ implicit: 3000 });

}
async function alterAssunto() {

    let chamados = await driver.wait(until.elementLocated(By.css("#root > div > div.menu > nav > a:nth-child(2)")), 5000).catch((err) => {
        logError(err);
    });

    await chamados.click().catch((err => {
        logError(err);
    }));;

    let chamado = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div.container-app > table > tbody > tr:nth-child(2) > td:nth-child(1)")), 5000).catch((err) => {
        logError(err);
    });
    await chamado.click().catch((err) => {
        logError(err);
    });

    let inputAssunto = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div:nth-child(5) > div > div.col-sm-10 > div > div.rbt-input-hint-container > input")), 5000).catch((err) => {
        logError(err);
    });
    await inputAssunto.sendKeys(Key.DOWN, Key.ENTER).catch((err) => {
        logError(err);
    });


    let bAlterAssunto = await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div:nth-child(5) > div > div:nth-child(3) > button")).catch((err) => {
        logError(err);
    });

    await bAlterAssunto.click().catch((err) => {
        logError(err);
    });

    protocolo = await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div.form-group.chamado > div.form-group.text-center > label")).getText().catch((err) => {
        logError(err);
    });
    numProtocolo = protocolo.replace("Protocolo: ", "")

}

async function redirecionarChamado() {

    await driver.manage().setTimeouts({ implicit: 3000 });
    await driver.findElement(By.css("#root > div > div.position-relative.container-fluid > div > div.PageChamados > div:nth-child(3) > div > div:nth-child(2) > button")).click().catch((err) => {
        logError(err);
    });

    let selectModalTransfer = await driver.wait(until.elementLocated(By.css('body > div.fade.modal.show > div > div > div.modal-body > form > div.form-row > div:nth-child(1) > select')), 3000).catch((err) => {
        logError(err);
    });

    await selectModalTransfer.click().catch((err) => {
        logError(err);
    });
    await selectModalTransfer.findElement(By.css('option[value="117"]')).click().catch((err) => {
        logError(err);
    });

    let selectModalPrioridade = await driver.wait(until.elementLocated(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > div.form-row > div:nth-child(2) > select")), 1000).catch((err) => {
        logError(err);
    });
    await selectModalPrioridade.click().catch((err) => {
        logError(err);
    });
    await selectModalPrioridade.findElement(By.css('option[value="1"]')).click().catch((err) => {
        logError(err);
    });


    let textAreaModal = await driver.wait(until.elementLocated(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > div.form-group > textarea")), 1000).catch((err) => {
        logError(err);
    });
    await textAreaModal.sendKeys("Teste Transferencia por teste de integração!").catch((err) => {
        logError(err);
    });

    await driver.findElement(By.css("body > div.fade.modal.show > div > div > div.modal-body > form > a > button")).click().catch((err) => {
        logError(err);
    });

    let fechartostfy = await driver.wait(until.elementLocated(By.css("#root > div > div.Toastify > div")), 3000).catch((err) => {
        logError(err);
    });
    await fechartostfy.click();
}

async function buscarChamado() {

    await driver.manage().setTimeouts({ implicit: 3000 });

    let fechartostfy = await driver.wait(until.elementLocated(By.css("#root > div > div.Toastify > div")), 3000).catch((err) => {
        logError(err);
    });
    await fechartostfy.click();

    //await driver.manage().setTimeouts({ implicit: 3000 });

    let filterChamado = await driver.wait(until.elementLocated(By.css('#root > div > div.menu > nav > a:nth-child(3) > button'))).catch((err) => {
        logError(err);
    });
    await filterChamado.click().catch((err) => {
        logError(err);
    });

    let filterProtocolo = await driver.wait(until.elementLocated(By.css("#root > div > div.position-relative.container-fluid > div > div:nth-child(2) > div.zebraB.filter > form > div:nth-child(2) > div:nth-child(3) > div > input")), 3000).catch((err) => {
        logError(err);
    });
    await filterProtocolo.sendKeys(numProtocolo, Key.ENTER).catch((err) => {
        logError(err);
    });
}

// async function criarChamado(mensager) {
//     throw { message: "bugou" }
//     console.log("criado")
// }


async function orquestrador() {

    //await criarChamado().catch(err => console.log(err));
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

    await driver.close()


}



function logError(err) {
    console.log(err);
    driver.close();
}

orquestrador();


