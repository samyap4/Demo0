import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
  } from 'react';
  import { useAuth0 } from '@auth0/auth0-react';
  
  // 1. Create the Context
  const OrgContext = createContext(null); // Default value is null
  
  // 2. Create the Provider Component
  export function OrgContextProvider({ children }) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [orgId, setOrgId] = useState(null);
  
    // Ref to track if we have already captured the initial org_id
    // This prevents subsequent user updates (from silent auth) potentially
    // clearing the orgId if the silent auth token lacks the claim.
    const orgIdCaptured = useRef(false);
  
    useEffect(() => {
      // --- Load persisted orgId on initial mount (optional) ---
      // Uncomment the next lines if you want persistence across refreshes
      if (!orgId && !isLoading) {
        const persistedOrgId = sessionStorage.getItem('appOrgId');
        if (persistedOrgId) {
           console.log('Loading persisted orgId:', persistedOrgId);
           setOrgId(persistedOrgId);
           orgIdCaptured.current = true; // Assume persisted is valid capture
        }
      }
      // --- End Optional Persistence Load ---
  
  
      // Check auth state to capture or clear orgId
      if (!isLoading && isAuthenticated && user?.org_id && !orgIdCaptured.current) {
        // Capture the org_id only ONCE right after initial login succeeds
        console.log('OrgContextProvider: Capturing initial org_id:', user.org_id);
        setOrgId(user.org_id);
        orgIdCaptured.current = true; // Mark as captured
  
        // --- Persist orgId (optional) ---
        // Uncomment if you want persistence across refreshes
        // sessionStorage.setItem('appOrgId', user.org_id);
        // --- End Optional Persistence ---
  
      } else if (!isLoading && !isAuthenticated) {
        // If user logs out or is not authenticated, clear the orgId
        if (orgId !== null || orgIdCaptured.current) {
           console.log('OrgContextProvider: Clearing org_id due to logout/unauthenticated state.');
           setOrgId(null);
           orgIdCaptured.current = false;
           // --- Clear persisted orgId (optional) ---
           // Uncomment if using persistence
           // sessionStorage.removeItem('appOrgId');
           // --- End Optional Persistence Clear ---
        }
      }
      // Intentionally excluding orgId from dependencies to avoid loops
      // We only react to auth state changes to CAPTURE or CLEAR the ID.
    }, [isLoading, isAuthenticated, user]);
  
    // 3. Provide the orgId value to children
    return <OrgContext.Provider value={orgId}>{children}</OrgContext.Provider>;
  }
  
  // 4. Create a custom hook for easy consumption (optional but recommended)
  export function useOrgId() {
    const context = useContext(OrgContext);
    // Optional: Add check if context is undefined (meaning hook used outside provider)
    if (context === undefined) {
      throw new Error('useOrgId must be used within an OrgContextProvider');
    }
    return context;
  }