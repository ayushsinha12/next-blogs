import { createContext } from 'react';

// Context to store user authentication and profile data
export const UserContext = createContext({ user: null, username: null });