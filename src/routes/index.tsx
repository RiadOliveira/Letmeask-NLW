import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';
import Home from '../pages/Home';
import NewRoom from '../pages/NewRoom';
import Room from '../pages/Room';
import AdminRoom from '../pages/Room/admin';
import { database } from '../services/firebase';

const Routes: React.FC = () => {
    const { user } = useAuth();

    const VerifyAdmin = (roomId: string) => {
        const roomRef = database.ref(`/rooms/${roomId}`);
        let result = true;

        if (user) {
            roomRef.get().then(response => {
                result = response.val().authorId === user?.id;
            });
        }

        return result;
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/new" component={NewRoom} />
                <Route
                    path="/rooms/:id"
                    render={({
                        match: {
                            params: { id },
                        },
                    }) =>
                        !VerifyAdmin(id) ? (
                            <Room />
                        ) : (
                            <Redirect to={`/admin/rooms/${id}`} />
                        )
                    }
                />
                <Route
                    path="/admin/rooms/:id"
                    render={({
                        match: {
                            params: { id },
                        },
                    }) =>
                        VerifyAdmin(id) ? (
                            <AdminRoom />
                        ) : (
                            <Redirect to={`/rooms/${id}`} />
                        )
                    }
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
