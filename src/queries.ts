import gql from 'graphql-tag'

export const flashcardsQuery = gql`
  query GetFlashcardsByUser {
    User(id: "cje8649pvb3u201775435vabn") {
      id
      flashcards(orderBy: createdAt_DESC) {
        id
        name
        example
        mastered
        meaning
        createdAt
      }
    }
  }
`

export const deleteFlashcardMutation = gql`
  mutation DeleteFlashcard($id: ID!) {
    deleteFlashcard(id: $id) {
      id
      name
      example
      meaning
      createdAt
    }
  }
`
