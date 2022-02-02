import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Comments from '../../components/comments'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts, getPostComments } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import CommentForm from '../../components/commentForm'
import { useEffect, useState } from 'react'

function CommentBlock ({ post, comments, loading, error, addComment }) {
  if (loading) {
    return (
      <h4 className="text-2xl">Loading Comments...</h4>
    )
  }

  if (error) {
    return (
      <h4 className="text-2xl">Failed to load comments for this post.</h4>
    )
  }

  return (
    <>
      <Comments comments={comments} />
      <CommentForm _id={post._id} addComment={addComment} />
    </>
  )
}

export default function Post({ post, morePosts, slug, preview }) {
  const router = useRouter()
  const [state, setState] = useState({
    loading: true,
    comments: [],
    error: null,
  })
  const addComment = (newComment) => {
    const comments = [...state.comments, newComment]
    setState({
      ...state,
      comments
    })
  }

  useEffect(() => {
    if (post?.commentsEnabled) {
      getCurrentPostComments(slug)
        .then(data => setState({
          loading: false,
          comments: data,
          error: null
        }))
        .catch(error => setState({
          loading: false,
          comments: [],
          error
        }))
    }
  }, [post])

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.body} />
            </article>
            {post.commentsEnabled &&
             <>
               <hr className="my-12"/>
               <CommentBlock
                 comments={state.comments}
                 post={post}
                 error={state.error}
                 loading={state.loading}
                 addComment={addComment}
               />
             </>
            }

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      slug: params.slug,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  }
}

export async function getCurrentPostComments(slug) {
  return getPostComments(slug, false)
}
