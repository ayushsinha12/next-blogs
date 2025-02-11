import Link from 'next/link';

/**
 * PostFeed Component
 * 
 * Renders a feed of posts, optionally including admin controls.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of post objects to display
 * @param {boolean} props.admin - Whether to show admin controls
 */
export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

/**
 * PostItem Component
 * 
 * Displays an individual post with metadata, including word count, read time,
 * and optional admin controls for editing and publishing status.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.post - Post object containing content, username, slug, title, heartCount, etc.
 * @param {boolean} [props.admin=false] - Whether to show admin controls
 */
function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}