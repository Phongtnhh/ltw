import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PermissionGuard = ({ 
  children, 
  resource, 
  action, 
  fallback = null,
  showFallback = true 
}) => {
  const { hasPermission, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!hasPermission(resource, action)) {
    if (showFallback && fallback) {
      return fallback;
    }
    
    if (showFallback) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-7a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            Bạn không có quyền truy cập chức năng này
          </p>
        </div>
      );
    }
    
    return null;
  }

  return children;
};

export default PermissionGuard;
