# Автотесты для дипломной работы

## Общая информация

Автотесты написаны с помощью [**Сypress**](https://www.cypress.io/). Для запуска введите команду:
  
`npm run cy:open`

Файл **all_in_one_go** запускает все написанные тесты.

Файлы **test_suite_(номер)** запускают тесты, соответствующие тест-комплектам.



## Важная информация перед началом работы

### Возможные ошибки

Если при запуске команды `npm run cy:open` Вы видите ошибку `no such file or directory`, убедитесь что Вы перешли в папку **Autotests-for-graduation-work**.
   
Cypress может выдавать ошибку подключения к сайту в части **Before each**. Для исправления данной ошибки достаточно перезапустить cypress.

Если при запуске тестов **all_in_one_go** у Вас возникают ошибки, попробуйте запустить отдельный набор интересующих Вас тестов **test_suite(номер)**.

Присутствуют тесты с провальным результатом. Это не является ошибкой, соответствующие тест-кейсы так же имеют провальный результат.
Подобные автотесты написаны с учетом ***ожидаемого результата***.

### Пример

ПС14. Взаимодействие функционала подсказок по автозаполнению и функционала фильтрации выпадающего списка

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
    
где,
    
    cy.get('.suggest').first().should('be.visible')
    cy.contains('Обед').should('not.exist')
   
ожидает, что в списке подсказок отсутствует слово "Обед" (согласно [тест-кейсу ПС14, тест-комплекта 1](https://docs.google.com/spreadsheets/d/1giDOcq-tJpmVPKhE6L_CIo2rkBsq6frsxR-7ffpQS60/edit#gid=1831451207&range=15:15)). 

Слово "Обед" есть в списке подсказок, тест проваливается.
