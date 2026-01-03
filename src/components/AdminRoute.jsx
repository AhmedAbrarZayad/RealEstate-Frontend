import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const AdminRoute = ({ children }) => {
    const { currentUser, userRole } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
