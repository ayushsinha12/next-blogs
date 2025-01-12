import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  console.log('Starting getServerSideProps...');
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  //const posts = (await postsQuery.get()).docs.map(postToJSON);
  let posts = []; // Default to empty in case of issues (safeguard)

  try {
    const snapshot = await postsQuery.get();

    if (!snapshot.empty) {
      posts = snapshot.docs.map(postToJSON); // Map to JSON
      console.log('Fetched posts:', posts); // Log posts if fetched
    } else {
      console.warn('No posts found, but Firestore returned an empty result.'); // Log warning
    }
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error.message); // Log the error
  }

  // Ensure we always return the fetched posts
  console.log('Returning posts to the component:', posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log('Initial posts from props:', props.posts);
  const [posts, setPosts] = useState(props.posts || []);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);
  if (!posts || posts.length === 0) {
    console.warn('Posts state is empty or undefined.');
  }
  const getMorePosts = async () => {
    setLoading(true);
    
    console.log('Current posts:', posts);
    console.log('getMorePosts function called'); // Check if this function is being executedconsole.log('Posts array:', posts);
    
    if (posts.length === 0) {
      // No posts to paginate; prevent further queries
      setLoading(false);
      setPostsEnd(true);
      return;
    }
  
    const last = posts[posts.length - 1];
    console.log('Last post:', last);

    if (!last) {
      console.error('Error: No posts available in the array.');
      setLoading(false);
      return; // Exit the function to prevent further errors
    }

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    console.log('Cursor:', cursor);

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
      <main>
        <PostFeed posts={posts} />

        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'You have reached the end!'}
      </main>
  );
}