import React, { useContext } from 'react';
import { useEffect } from 'react';
import { createContext, useCallback, useState } from 'react';
import { auth, firebase } from '../services/firebase';

interface User {
    id: string;
    name: string;
    avatar: string;
}

interface IAuthContext {
    user?: User;
    signInWithGoogle(): Promise<void>;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContext: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                const { displayName, photoURL, uid } = authUser;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signInWithGoogle = useCallback(async () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            });
        }
    }, []);

    return (
        <authContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </authContext.Provider>
    );
};

const useAuth = (): IAuthContext => useContext(authContext);

export { AuthContext, useAuth };
