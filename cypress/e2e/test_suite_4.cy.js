describe('Автотесты для тест-комплекта 4.', () => {
    beforeEach(() => {
      cy.visit('https://horo.mail.ru/sonnik/')
    })
    it('ФПБ2. Выбор фильтра и выбор образа в списке ключевых слов', () => {
        cy.get('[href="/sonnik/nostradamus/"]').click()
        cy.get('[href="/sonnik/nostradamus/ts/"]>.filter__text').click()

        cy.get('[href="/sonnik/nostradamus/tserkov/"]').should('be.visible')
    })

    it('ФПБ3. Выбор фильтра по букве и ввод в поле ввода действительного слова, начинающегося на эту же букву', () => {
        cy.get('[href="/sonnik/v/"]>.filter__text').click()

        cy.get('input[name="q"]')
            .type('Водопад').should('have.value', 'Водопад')

        cy.contains('Толковать сон').click()

        cy.get('.newsitem__title[href="/sonnik/miller/vodopad/"]').should('be.visible')
        cy.get('.newsitem__title[href="/sonnik/hasse/vodopad/"]').should('be.visible')
    })

    it('ФПБ4. Выбор фильтра по букве и ввод в поле ввода действительного слова, начинающегося на другую букву', () => {
        cy.get('[href="/sonnik/v/"]>.filter__text').click()

        cy.get('input[name="q"]')
            .type('Амур').should('have.value', 'Амур')

        cy.contains('Толковать сон').click()

        cy.get('div> .article__item > p')
            .should('be.visible')
            .should('contain', 'Амур')
    })

    it('ФПБ5. Выбор фильтра по букве, затем выбор фильтра по толкователям', () => {
        cy.get('[href="/sonnik/ts/"]>.filter__text').click()
        cy.get('[href="/sonnik/nostradamus/"]').click()

        cy.url().should('not.contain', 'ts')
            .should('eq', 'https://horo.mail.ru/sonnik/nostradamus/')
    })

    it('ФПБ6. Выбор фильтра по букве, затем выбор ключевого слова', () => {
        cy.get('[href="/sonnik/v/"]>.filter__text').click()
        cy.contains('Вертолет').click()

        cy.get('div> .article__item > p')
            .should('be.visible')
            .should('contain', 'Вертолет')
    })
})