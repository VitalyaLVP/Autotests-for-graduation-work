describe('Все автотесты.', () => {
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
      .type('Обед').should('have.value', 'Обед')
  
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

  it('И1. Работоспособность кнопки "Читать полностью"', () => {
    cy.get('.text_dynamic').should('not.be.visible')

    cy.get('.link_dashed>span').click()

    cy.get('.text_dynamic').should('be.visible')
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