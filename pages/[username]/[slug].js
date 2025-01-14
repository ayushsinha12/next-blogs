import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import HeartButton from '../../components/HeartButton';
import AuthCheck from '../../components/AuthCheck';
import Link from 'next/link';

/**
 * Fetch static props for a post based on username and slug.
 * 
 * @param {Object} params - Route parameters containing username and slug.
 * @returns {Object} - Static props including the post data and Firestore path.
 */
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

/**
 * Generate static paths for all posts.
 * 
 * @returns {Object} - Paths for static generation and fallback configuration.
 */
export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

/**
 * Post Page Component
 * 
 * Displays the content of a single post, including real-time updates and the heart button.
 * 
 * @param {Object} props - Props containing the post data and Firestore path.
 */
export default function Post(props) {
    const postRef = firestore.doc(props.path);
    const [realtimePost] = useDocumentData(postRef);
  
    const post = realtimePost || props.post;
  
    return (
      <main className={styles.container}>
  
        <section>
          <PostContent post={post} />
        </section>
  
        <aside className="card">
          <p>
            <strong>{post.heartCount || 0} 🤍</strong>
          </p>

          <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
        </aside>
      </main>
    );
}