import Head from 'next/head';

/**
 * Metatags Component
 * 
 * Generates meta tags for SEO and social media sharing.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title='The Full Next.js + Firebase Course'] - Page title
 * @param {string} [props.description='A complete Next.js + Firebase course by Fireship.io'] - Page description
 * @param {string} [props.image='https://fireship.io/courses/react-next-firebase/img/featured.png'] - Image URL for sharing
 */
export default function Metatags({
  title = 'The Full Next.js + Firebase Course',
  description = 'A complete Next.js + Firebase course by Fireship.io',
  image = 'https://fireship.io/courses/react-next-firebase/img/featured.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}