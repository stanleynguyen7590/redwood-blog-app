import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { BeforeResolverSpecType, UserInputError } from '@redwoodjs/api'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

const validate = (input) => {
  if (input.email && !input.email.match(/[^@]+@[^.]+\..+/)) {
    throw (
      (new UserInputError("Can't create new contact"),
      {
        messages: {
          email: ['is not formatted like an email address'],
        },
      })
    )
  }
}
export const contacts = () => {
  return db.contact.findMany()
}

export const createContact = ({ input }) => {
  validate(input)
  return db.contact.create({ data: input })
}
