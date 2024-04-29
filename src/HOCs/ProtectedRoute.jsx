import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const location = useLocation();

    React.useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsAuthenticated(!!user);
      });

      return unsubscribe;
    }, []);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return AuthenticatedComponent;
};

export default ProtectedRoute;