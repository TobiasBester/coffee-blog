import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'categories': categories[]->{
            title,
            description
  },
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  return client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
}

export async function getAllCategories() {
  return client.fetch(`*[_type == "category"]{ 'category': title }`)
}

export async function getAllPostsForHome (preview, category) {
  const results = category
                  ? await getClient(preview).fetch(
      `*[_type == 'post' &&
               *[_type == "category" &&
                  lower(title) == $category][0]._id in categories[]._ref] | order(publishedAt desc){
                ${postFields}
            }`, { category: category.toLowerCase() })
                  : await getClient(preview).fetch(
      `*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        commentsEnabled
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}

export async function getPostComments(slug, preview) {
  const curClient = getClient(preview)
  return curClient.fetch(
    `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
          'comments': *[
                        _type == "comment" && 
                        post._ref == ^._id && 
                        approved == true]
                        | order(_createdAt asc) {
            _id, 
            name, 
            email, 
            comment,
            'responseToId': responseTo->_id,
            _createdAt
          }
        }`,
    { slug }
  ).then(res => res?.[0]?.comments)
}
