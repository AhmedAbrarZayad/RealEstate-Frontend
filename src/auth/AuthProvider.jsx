import { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { API_BASE } from "../config/api";

const API_BASE_URL = API_BASE;

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password, displayName, photoURL) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with displayName and optional photoURL
        await updateProfile(user, {
            displayName: displayName,
            photoURL: photoURL || '',
        });

        return userCredential; // return the full userCredential if needed
    }

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        setUserRole(null);
        return await signOut(auth);
    }

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    // Fetch user role from backend
    async function fetchUserRole(user) {
        try {
            const token = await user.getIdToken();
            const response = await fetch(`${API_BASE_URL}/users?email=${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUserRole(data.role || 'user');
            } else {
                setUserRole('user');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user');
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserRole(user);
            } else {
                setUserRole(null);
            }
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        signup,
        login,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}