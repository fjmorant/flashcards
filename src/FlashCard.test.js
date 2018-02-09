import FlashCard from './FlashCard'

describe('FlashCard', () => {
  test('change name', () => {
    const flashCard = new FlashCard()

    flashCard.changeName('Hello')

    expect(flashCard.name).toEqual('Hello')
  })

  test('change example', () => {
    const flashCard = new FlashCard()

    flashCard.changeExample('Hello how are you?')

    expect(flashCard.example).toEqual('Hello how are you?')
  })

  test('change meaning', () => {
    const flashCard = new FlashCard()

    flashCard.changeMeaning('Greeting')

    expect(flashCard.meaning).toEqual('Greeting')
  })

  test('toggle mastered', () => {
    const flashCard = new FlashCard()

    flashCard.toggleMaster()

    expect(flashCard.mastered).toEqual(true)
  })
})
