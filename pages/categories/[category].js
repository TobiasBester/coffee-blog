import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllCategories, getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function CategoryPage({ allPosts, preview }) {
  const heroPost = allPosts ? allPosts[0] : null
  const morePosts = allPosts ? allPosts.slice(1) : null
  const router = useRouter()
  const { category } = router.query
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Coffee Blog posts | {category?.toUpperCase()}</title>
        </Head>
        <Container>
          <Intro />
          {category && <h3 className="text-center text-2xl md:text-4xl my-6 md:my-8">
            {`${category.toUpperCase()} POSTS`}
          </h3>}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {!heroPost && (
            <span className="text-4xl">No posts in this category</span>
          )}
          {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {
  const allPosts = await getAllPostsForHome(preview, params.category)
  return {
    props: { allPosts, preview },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allCategories = await getAllCategories()
  return {
    paths:
      allCategories?.map((cat) => ({
        params: {
          category: cat.category,
        },
      })) || [],
    fallback: true,
  }
}
