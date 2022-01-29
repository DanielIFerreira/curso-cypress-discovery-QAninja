class SignupPage{
    go() {
        cy.visit('/')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('contain', 'Cadastre-se para')
    }

    fillform(deliver) {
        cy.get('input[placeholder="Nome completo"]').type(deliver.name)
        cy.get('input[placeholder="CPF somente números"]').type(deliver.cpf)
        cy.get('input[placeholder="E-mail"]').type(deliver.email)
        cy.get('input[name=whatsapp]').type(deliver.whatsapp)
        cy.get('input[name=postalcode]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"][placeholder="Número"]').type(deliver.address.number)
        cy.get('input[name="address-details"][placeholder="Complemento"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"][placeholder="Bairro"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"][placeholder="Cidade/UF"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method.moto).click()
        cy.get('input[accept^="image"]').attachFile(deliver.cnh)
    }

    submit() {
        cy.get('button[type="submit"][class="button-success"]').click()
    }

    modalContentShouldBe(Message) {
       
        cy.get('.swal2-container .swal2-html-container').should('have.text', Message)
    }
    alertMessageShouldBe(Message){
        //cy.get('.alert-error').should('have.text', Message)
        cy.contains('.alert-error', Message).should('be.visible')
    }
}


export default new SignupPage;