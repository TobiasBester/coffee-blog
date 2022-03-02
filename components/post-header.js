import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Link from 'next/link'

export default function PostHeader({ title, coverImage, date, author, categories = [] }) {

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author?.name} picture={author?.picture} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author?.name} picture={author?.picture}/>
        </div>
        {categories?.length > 0 && (
          <div className="my-2 text-lg">
            Categories: {categories.map((category, idx) => (
            <Link
              key={idx}
              as={`/categories/${category.title.toLowerCase()}`}
              href="/categories/[category]"
            >
              <span
                className="font-thin cursor-pointer rounded-lg py-1 px-2 bg-black text-white"
              >
                {category.title}
              </span>
            </Link>
          ))}
          </div>
        )}
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
