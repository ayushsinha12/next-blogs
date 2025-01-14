import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

/**
 * PostContent Component
 * 
 * Displays the main UI content of a post, including the title, author, creation date, and body content.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.post - The post object containing title, username, content, and createdAt
 */
export default function PostContent({ post }) {
  // Convert the createdAt timestamp to a Date object
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}