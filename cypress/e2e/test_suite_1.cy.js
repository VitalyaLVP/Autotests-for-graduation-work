
describe('Автотесты для тест-комплекта 1.', () => {
  beforeEach(() => {
    cy.visit('https://horo.mail.ru/sonnik/')
  })
  it('ПС1. Ввод действительного слова в поисковую строку и выбор фильтра', () => {
    cy.get('input[name="q"]')
      .type('Водопад').should('have.value', 'Водопад')
    
    cy.get('.dropdown')
      .click()

    cy.contains('Сонник Миллера')
      .click()
    
    cy.get('.dropdown__text')
      .should('contain', 'Сонник Миллера')

    cy.get('.button').click()

    cy.get('div> .article__item > p')
      .should('be.visible')
      .should('contain', 'Увидеть во сне водопад — предвещает, что вы сумеете сдержать свои необузданные желания и судьба будет чрезвычайно благоприятна для ваших успехов.')
  })

  it('ПС2. Ввод части слова для проверки списка подсказок автозаполнения', () => {
    cy.get('input[name="q"]')
      .type('Водо').should('have.value', 'Водо')

    cy.contains('Водопад').should('be.visible')
    cy.contains('Водоворот').should('be.visible')
    cy.contains('Водоем').should('be.visible')
    cy.contains('Водопровод').should('be.visible')
  })

  it('ПС3. Ввод части слова и выбор его из списка подсказок автозаполнения', () => {
    cy.get('input[name="q"]')
      .type('Водо').should('have.value', 'Водо')

    cy.contains('Водопад').click()

    cy.get('input[name="q"]').should('have.value', 'Водопад')
  })

  it('ПС4. Ввод действительного слова в поисковую строку без изменения фильтра (по умолчанию "Все сонники").', () => {
    cy.get('input[name="q"]')
      .type('Водопад').should('have.value', 'Водопад')

    cy.get('.button').click()

    cy.get('.newsitem__title[href="/sonnik/miller/vodopad/"]').should('be.visible')
    cy.get('.newsitem__title[href="/sonnik/hasse/vodopad/"]').should('be.visible')
  })

  it('ПС5. Ввод действительного слова в поисковую строку и выбор фильтра. Поиск через клавишу Enter', () => {
    cy.get('input[name="q"]')
      .type('Водопад').should('have.value', 'Водопад')
  
    cy.get('.dropdown')
      .click()

    cy.get('div[data-optidx="2"]')
      .click()
  
    cy.get('.dropdown__text')
      .should('contain', 'Сонник Миллера')

    cy.get('input[name="q"]')
      .type('{enter}')

    cy.get('div> .article__item > p')
      .should('contain', 'Увидеть во сне водопад — предвещает, что вы сумеете сдержать свои необузданные желания и судьба будет чрезвычайно благоприятна для ваших успехов.')
  })

  it('ПС7. Ввод слова, отсутствующего в базе данных в поисковую строку без изменения фильтра (по умолчанию "Все сонники").', () => {
    cy.get('input[name="q"]')
      .type('Трактор').should('have.value', 'Трактор')

    cy.get('.button').click()

    cy.get('div>.article__item').should('contain', "К сожалению, «Трактор» среди образов снов не найдено. Попробуйте уточнить запрос и еще раз воспользуйтесь поисковой формой.")
  })

  it('ПС8. Ввод действительного слова в поисковую строку и выбор фильтра в котором данное слово отсутствует).', () => {
    cy.get('input[name="q"]')
      .type('Водопад').should('have.value', 'Водопад')
  
    cy.get('.dropdown')
      .click()

    cy.contains('Сонник Лоффа')
      .click()
  
    cy.get('.dropdown__text')
      .should('contain', 'Сонник Лоффа')

    cy.get('.button').click()

    cy.get('.newsitem__title[href="/sonnik/miller/vodopad/"]').should('be.visible')
    cy.get('.newsitem__title[href="/sonnik/hasse/vodopad/"]').should('be.visible')
  })

  it('ПС9. Ввод латиницы в поисковую строку без изменения фильтра (по умолчанию "Все сонники").', () => {
    cy.get('input[name="q"]')
      .type('Waterfall').should('have.value', 'Waterfall')

    cy.get('.button').click()

    cy.get('div>.article__item').should('contain', "К сожалению, «Waterfall» среди образов снов не найдено. Попробуйте уточнить запрос и еще раз воспользуйтесь поисковой формой.")
  })

  it('ПС11. Ввод числового значения в поисковую строку без изменения фильтра (по умолчанию "Все сонники").', () => {
    cy.get('input[name="q"]')
      .type('0').should('have.value', '0')

    cy.get('.button').click()

    cy.get('div>.article__item').should('contain', "Введите текст для поиска")
  })

  it('ПС12. Ввод символов юникода в поисковую строку без изменения фильтра (по умолчанию "Все сонники").', () => {
    cy.get('input[name="q"]')
      .type('♣☺♂” , “”‘~!@#$%^&*()?>,./\<][ /*<!–”", “$”;–>').should('have.value', '♣☺♂” , “”‘~!@#$%^&*()?>,./\<][ /*<!–”", “$”;–>')

    cy.get('.button').click()

    cy.get('div>.article__item').should('contain', "Введите текст для поиска")
  })

  it('ПС14. Взаимодействие функционала подсказок по автозаполнению и функционала фильтрации выпадающего списка', () => {
    cy.get('.dropdown')
      .click()

    cy.contains('Сонник Нострадамуса')
      .click()
    
    cy.get('.dropdown__text')
      .should('contain', 'Сонник Нострадамуса')
    
    cy.get('input[name="q"]')
      .type('Обе').should('have.value', 'Обе')

    cy.get('.suggest').first().should('be.visible')
    cy.contains('Обед').should('not.exist')
  })

  it('ПС15. Ввод слова, относящегося к нескольким сонникам с выбором фильтра', () => {
    cy.get('.dropdown')
      .click()

    cy.contains('Сонник Нострадамуса')
      .click()
    
    cy.get('.dropdown__text')
      .should('contain', 'Сонник Нострадамуса')
    
    cy.get('input[name="q"]')
      .type('Ястреб').should('have.value', 'Ястреб')

    cy.get('.button').click()

    cy.get('div> .article__item > p')
      .should('contain', 'Ястреб - символ жестокости, стремительности, опасности.')
    
    cy.get('.newsitem__title[href="/sonnik/loff/jastreb/"]').should('be.visible')
    cy.get('.newsitem__title[href="/sonnik/miller/jastreb/"]').should('be.visible')
    cy.get('.newsitem__title[href="/sonnik/hasse/jastreb/"]').should('be.visible')
  })

  it('ПС16. Автоматический выбор сонника при вводе слова', () => {
    cy.get('input[name="q"]')
      .type('Ездок').should('have.value', 'Ездок')

    cy.get('.button').click()

    cy.get('.dropdown__text')
      .should('contain', 'Сонник мисс Хассе')
  })
})