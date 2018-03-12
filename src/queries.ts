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

export const getFlashCardByIdAndUser = gql`
  query GetFlashcardByIdAndUser($flashCardId: ID!) {
    __typename
    Flashcard(id: $flashCardId) {
      id
      name
      example
      mastered
      meaning
      createdAt
    }
  }
`

export const createNewFlashcard = gql`
  mutation submitNewFlashcard(
    $name: String!
    $meaning: String!
    $example: String!
    $mastered: Boolean!
  ) {
    createFlashcard(
      name: $name
      meaning: $meaning
      example: $example
      mastered: $mastered
      userId: "cje8649pvb3u201775435vabn"
    ) {
      id
      name
      meaning
      example
      mastered
    }
  }
`

export const updateFlashcard = gql`
  mutation editFlashcard(
    $id: ID!
    $name: String!
    $meaning: String!
    $example: String!
    $mastered: Boolean!
  ) {
    updateFlashcard(
      id: $id
      name: $name
      meaning: $meaning
      example: $example
      mastered: $mastered
      userId: "cje8649pvb3u201775435vabn"
    ) {
      id
      name
      meaning
      example
      mastered
    }
  }
`
