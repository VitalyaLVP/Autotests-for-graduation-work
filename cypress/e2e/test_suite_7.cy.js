describe('Автотесты для тест-комплекта 7.', () => {
    beforeEach(() => {
      cy.visit('https://horo.mail.ru/sonnik/')
    })
    
    it('РГ7. Ввод латиницы в поле ввода', () => {
        cy.get('._756dee3138')
            .type('plainaddress')

        cy.contains('Подписаться').click()

        cy.get('.a847f0780f').should('be.visible')
            .should('have.text', 'Данный email не соответствует формату')
    })

    it('РГ8. Ввод кириллицы в поле ввода', () => {
        cy.get('._756dee3138')
            .type('неверныйадрес')

        cy.contains('Подписаться').click()

        cy.get('.a847f0780f').should('be.visible')
            .should('have.text', 'Данный email не соответствует формату')
    })

    it('РГ9. Ввод символов, не входящих в набор символов ASCII', () => {
        cy.get('._756dee3138')
            .type('©§¥£¢')

        cy.contains('Подписаться').click()

        cy.get('.a847f0780f').should('be.visible')
            .should('have.text', 'Данный email не соответствует формату')
    })

    it('РГ10. Ввод пустой строки', () => {
        cy.get('._756dee3138')
        cy.contains('Подписаться').click()

        cy.get('.a847f0780f').should('be.visible')
            .should('have.text', 'Данный email не соответствует формату')
    })
})