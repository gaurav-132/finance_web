import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const ProtectedRoute = ({ isAuthenticated, children }) => {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login', { replace: true });
        }
    }, [isAuthenticated]);

    return isAuthenticated && children;
};

export default ProtectedRoute;
