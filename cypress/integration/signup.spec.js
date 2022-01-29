import signup from '../pages/SignupPage'
import signupFactory from '../factories/signupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup',()=> {
    //Funcionamento dos Ganchos em Cypress
    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODS os casos de teste')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA casos de teste')
    // })
    
    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de teste')
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA casos de teste')
    // })
    beforeEach(function (){
        cy.fixture('deliver').then((d)=>{
            this.deliver = d
        })
    })

    it('User should by deliver', function() {
        var deliver = signupFactory.deliver()
        //Login
        signup.go()
        //Massa de Dados
        signup.fillform(deliver)
        //Botão de submit
        signup.submit()
        //Metodo para verificar menssage de ERRO
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
    });

    it('Incorrect document', function()  {
        var deliver = signupFactory.deliver()
        deliver.cpf = '000123654AA'
        //Login 
        signup.go()
        //Massa de Dados
        signup.fillform(deliver)
        //Botão de submit
        signup.submit()
        //Metodo para verificar menssage de ERRO
        signup.alertMessageShouldBe('Oops! CPF inválido')
    });

    it('Incorrect email', function()  {
        var deliver = signupFactory.deliver()
        deliver.email = 'rafa.teste.com'
        //Login 
        signup.go()
        //Massa de Dados
        signup.fillform(deliver)
        //Botão de submit
        signup.submit()
        //Metodo para verificar menssage de ERRO
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    });
    //Caso o programa encontra um messagem que não esta correta e continua testando o fluxo
    context('Required fields', function(){
        const messagens = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'name', output: 'É necessário informar o CPF'},
            {field: 'name', output: 'É necessário informar o email'},
            {field: 'name', output: 'É necessário informar o CEP'},
            {field: 'name', output: 'É necessário informar o número do endereço'},
            {field: 'name', output: 'Selecione o método de entrega'},
            {field: 'name', output: 'Adicione uma foto da sua CNH'},
            
        ]

        before(function(){
            SignupPage.go()
            signup.submit()
        })

        messagens.forEach(function(msg) {
            it(`${msg.field} is riquired`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})