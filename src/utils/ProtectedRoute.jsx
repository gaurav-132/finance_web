import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login', { replace: true });
        } else {
            setIsChecking(false);
        }
    }, [isAuthenticated, navigate]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
