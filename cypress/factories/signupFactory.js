var faker = require('faker')
var geradorCPF = require('gerador-validador-cpf')
export default {
    deliver: function(){
        var firtsName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var data = {
            name: `${firtsName} ${lastName}`,
                cpf: geradorCPF.generate(),
                email: faker.internet.email(firtsName),
                whatsapp: '15999999999',
                address:{
                    postalcode: '18076000',
                    street:'Rua Andrelino de Souza',
                    number: '0011',
                    details: 'Bloca A Apartamento Nº10',
                    district: 'Jardim Maria Antônia Prado',
                    city_state: 'Sorocaba/SP'
                },
                delivery_method:{
                    moto: 'Moto',
                    bicicleta: 'Bicicleta',
                    vanCarro: 'Van/Carro'
                },
                cnh: 'imagens/cnh-digital.jpg' 
        }
        return data
    }
}