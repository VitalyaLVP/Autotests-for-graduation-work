describe('Автотесты для тест-комплекта 5.', () => {
    beforeEach(() => {
      cy.visit('https://horo.mail.ru/sonnik/')
    })

    it('КС1. Выбор фильтра в списке автоматически заполняет фильтр в блоке поисковой строки', () => {
        cy.get('[href="/sonnik/miller/eger/"]').click()

        cy.get('div> .article__item > p')
            .should('be.visible')
            .should('contain', 'Увидеть во сне егеря')
    })

    it('КС2. Выбор фильтра в списке автоматически заполняет фильтр в блоке поисковой строки', () => {
        cy.get('[href="/sonnik/vaza/"]').click()

        cy.get('.newsitem__title[href="/sonnik/hasse/vaza/"]').should('be.visible')
        cy.get('.newsitem__title[href="/sonnik/miller/vaza/"]').should('be.visible')
        cy.get('.newsitem__title[href="/sonnik/vanga/vaza/"]').should('be.visible')
    })
})