import '../styles/globals.css';
import Navbar from '../components/Navbar'; // Adjust the path if needed
import { Toaster } from 'react-hot-toast'; // Import the Toaster component
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

/**
 * Custom App Component
 * 
 * Wraps the application with global styles, a navbar, and user context.
 * 
 * @param {Object} props - Props containing the current page component and its data.
 * @param {React.Component} props.Component - The active page component.
 * @param {Object} props.pageProps - Props for the active page component.
 */
export default function MyApp({ Component, pageProps }) {
  
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Toaster /> {/* Place the Toaster here */}
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}