describe('Автотесты для тест-комплекта 3.', () => {
    beforeEach(() => {
      cy.visit('https://horo.mail.ru/sonnik/')
    })

    it('И1. Работоспособность кнопки "Читать полностью"', () => {
       cy.get('.text_dynamic').should('not.be.visible')

       cy.get('.link_dashed>span').click()

       cy.get('.text_dynamic').should('be.visible')
    })
})