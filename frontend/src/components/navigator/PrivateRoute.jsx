import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, requiredPermission, isAuthenticated}) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: API call to fetch user permissions
  useEffect(() => {
    // Replace with your API call logic
    // For demonstration, let's assume this API returns permissions in an array
    fetch('users/userperms')  // Adjust the API endpoint
      .then(response => response.json())
      .then(data => {
        setUserPermissions(data.permissions);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching permissions:', error));
  }, []);

  // set users permissions
  const hasRequiredPermission = userPermissions.includes(requiredPermission);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (!hasRequiredPermission) {
    return <div>You're authentic ... but you don't got permissions</div>;
  } else {
    return <Component />;
  }
};
export default PrivateRoute;


// The PrivateRoute component accepts an additional prop called requiredPermission which specifies the permission required to access the route.

// The useEffect hook fetches user permissions from the Django backend's /api/user/permissions/ endpoint (you need to implement this API view on your Django backend). It then updates the userPermissions state.

// The hasRequiredPermission variable is determined based on whether the requiredPermission is present in the userPermissions array.

// The final rendering logic checks if the user is authenticated and has the required permission. If both conditions are met, it renders the element, otherwise it navigates the user to the login page.

// Please replace the simulated API call with your actual API logic that fetches user permissions from your Django backend. Also, ensure you have implemented the API view on the Django backend to fetch user permissions for the authenticated user.

