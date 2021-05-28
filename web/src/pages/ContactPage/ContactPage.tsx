import React from 'react'
import {
  Submit,
  Form,
  TextField,
  TextAreaField,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
// import toast from 'react-hot-toast'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'
const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })
  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }
  const formMethods = useForm({ mode: 'onBlur' })

  return (
    <>
      <Toaster></Toaster>
      <Form
        formMethods={formMethods}
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        ></FormError>
        {/* {error && (
          <div style={{ color: 'red' }}>
            {"We couldn't send your message: "}
            {error.message}
          </div>
        )} */}
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        ></TextField>
        <FieldError name="name" className="error"></FieldError>
        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        ></TextField>
        <FieldError name="email" className="error"></FieldError>
        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        ></TextAreaField>
        <FieldError name="message" className="error"></FieldError>
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
