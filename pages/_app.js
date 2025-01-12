import '../styles/globals.css';
import Navbar from '../components/Navbar'; // Adjust the path if needed
import { Toaster } from 'react-hot-toast'; // Import the Toaster component
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';


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