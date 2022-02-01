import sanityClient from '@sanity/client'
const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-01-02'
}
const client = sanityClient(config)

export default async function createComment(req, res) {
  const { _id, name, email, comment, approved} = JSON.parse(req.body)
  let createdComment = null
  try {
    const response = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
      approved
    })
    createdComment = {
      _createdAt: response._createdAt,
      _id: response._id,
      approved: response.approved,
      comment: response.comment,
      email: response.email,
      name: response.name,
      post: response.post,
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: `Couldn't submit comment`, err})
  }
  return res.status(200).json(createdComment)
}
