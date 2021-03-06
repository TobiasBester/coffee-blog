import { BLOG_SUBTITLE, BLOG_TITLE } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {BLOG_TITLE}
      </h1>
      <h4 className="text-center md:text-left text-lg md:text-2xl mt-5 md:pl-8">
        {BLOG_SUBTITLE}
      </h4>
    </section>
  )
}
