import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for saved user in localStorage on mount
    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            // user object is already set in localStorage by authService
            // but we need to update state here
            const user = {
                userId: data.userId,
                name: data.name,
                email: data.email,
                role: data.role
            };
            setUser(user);
            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            const user = {
                userId: data.userId,
                name: data.name,
                email: data.email,
                role: data.role
            };
            setUser(user);
            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            return { success: false, message };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateProfile = (updates) => {
        // This updates local state, useful if we change profile info that is stored in user object
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        loading,
        isAuthenticated: !!user,
        isStudent: user?.role === 'STUDENT',
        isStaff: user?.role === 'STAFF',
        isAdmin: user?.role === 'ADMIN'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
