import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context'; 

/**
 * AuthCheck Component
 * 
 * This component conditionally renders its children based on the user's authentication status.
 * If the user is logged in (i.e., a username is present in the context), the children are displayed.
 * Otherwise, it renders a fallback element, which defaults to a link prompting the user to sign in.
 * 
 * Props:
 * - children: The content to render for authenticated users.
 * - fallback: Optional. The content to render for unauthenticated users (default: sign-in link).
 */
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username 
    ? props.children // Render children if user is authenticated
    : props.fallback || <Link href="/enter">You must be signed in</Link>; // Render fallback or default sign-in link
}