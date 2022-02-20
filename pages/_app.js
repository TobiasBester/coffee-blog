import '../styles/index.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="saddleBrown" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
