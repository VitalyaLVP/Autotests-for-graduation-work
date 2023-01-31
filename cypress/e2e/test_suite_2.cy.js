/// <reference types="cypress" />

describe('Автотесты для тест-комплекта 2.', () => {
    beforeEach(() => {
      cy.visit('https://horo.mail.ru/sonnik/')
    })

    it('ФТ2. Выбор фильтра в списке автоматически заполняет фильтр в блоке поисковой строки', () => {
        cy.get('[href="/sonnik/vanga/"]').click()

        cy.get('.dropdown__text')
          .should('contain', 'Сонник Ванги')
    })

    it('ФТ3. Выбор фильтра в списке, ввод действительного слова в поле ввода.', () => {
        cy.get('[href="/sonnik/hasse/"]').click()
    
        cy.get('.dropdown__text')
          .should('contain', 'Сонник мисс Хассе')
        
        cy.get('input[name="q"]')
          .type('Заваривать чай').should('have.value', 'Заваривать чай')
    
        cy.get('.button').click()
    
        cy.get('div> .article__item > p')
          .should('contain', 'Заваривать чай - неожиданные гости.')
    })
    
    it('ФТ4. Выбор фильтра в списке, ввод действительного слова в поле ввода, отсутсвующего в этом фильтре', () => {
        cy.get('[href="/sonnik/miller/"]').click()
      
        cy.get('.dropdown__text')
          .should('contain', 'Сонник Миллера')

        cy.get('input[name="q"]')
          .type('Оазис').should('have.value', 'Оазис')

        cy.get('.button').click()
    
        cy.get('.newsitem__title[href="/sonnik/hasse/oazis/"]').should('be.visible')
        cy.get('.newsitem__title[href="/sonnik/nostradamus/oazis/"]').should('be.visible')
    })

    it('ФТ6. Выбор фильтра в списке и выбор фильтра по первой букве ключевого слова, которая отсутсвует в соннике', () => {
        cy.get('[href="/sonnik/nostradamus/"]').click()
        cy.get('.filter__item[href="/sonnik/shh/"]').should('not.exist')
    })

    it('ФТ7. Выбор фильтра и выбор образа в списке ключевых слов', () => {
        cy.get('[href="/sonnik/nostradamus/"]').click()
        cy.get('[href="/sonnik/nostradamus/vino/"]').should('be.visible')
            .click()

        cy.get('div> .article__item > p')
            .should('contain', 'Вино')
    })
    
})