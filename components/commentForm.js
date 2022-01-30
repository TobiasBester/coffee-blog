import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getFromLocalStorage, isNotBlank, saveToLocalStorage } from '../lib/utils'

export default function CommentForm ({_id}) {
  const [formData, setFormData] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const defaultValues = getDefaultFormValues()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })
  const onSubmit = async data => {
    setIsSubmitting(true)
    let response
    setFormData(data)
    data.approved = true

    storeFormValues(data)

    try {
      response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
        type: 'application/json'
      })
      setIsSubmitting(false)
      setHasSubmitted(true)
    } catch (err) {
      setFormData(err)
    }
  }

  if (isSubmitting) {
    return <h3>Submitting comment…</h3>
  }
  if (hasSubmitted) {
    return (
    <>
      <h3>Thanks for your comment!</h3>
      <ul>
        <li>
          Name: {formData.name} <br />
          Email: {formData.email} <br />
          Comment: {formData.comment}
        </li>
      </ul>
    </>)
  }

  return (
    <>
      <p className="text-xl">Join in on the conversation!</p>
      <p className="text-md mb-4">Your email will not be displayed.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg" disabled>
        <input {...register("_id")} type="hidden" name="_id" value={_id} />
        <label className="block mb-5">
          <span className="text-zinc-700">Name *</span>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            {...register("name", {required: true, maxLength: { value: 30, message: 'Name can be 30 characters max' }})}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
            placeholder="John Appleseed"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label className="block mb-5">
          <span className="text-zinc-700">Email</span>
          <input
            id="email"
            name="email"
            type="email"
            {...register("email", {maxLength: { value: 40, message: 'Email can be 40 characters max' }})}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
            placeholder="your@email.com"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className="block mb-5">
          <span className="text-zinc-700">Comment *</span>
          <textarea
            id="comment"
            {...register("comment", {required: true, maxLength: { value: 2800, message: 'Comment can be 2800 characters max' }})}
            name="comment"
            className="shadow border rounded py-2 px-3  form-textarea mt-1 block w-full"
            rows="8"
            placeholder="Enter some long form content."
          />
          {errors.comment && <span>{errors.comment.message}</span>}
        </label>
        <input type="submit" className="shadow bg-yellow-800 hover:bg-yellow-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" />
      </form>
    </>
  )
}

const getDefaultFormValues = () => {
  const defaultValues = {}
  const lsName = getFromLocalStorage('coffee-blog-comments-name')
  const lsEmail = getFromLocalStorage('coffee-blog-comments-email')
  if (isNotBlank(lsName)) defaultValues.name = lsName
  if (isNotBlank(lsEmail)) defaultValues.email = lsEmail
  return defaultValues
}

const storeFormValues = ({ name, email }) => {
  saveToLocalStorage('coffee-blog-comments-name', name)
  saveToLocalStorage('coffee-blog-comments-email', email)
}
