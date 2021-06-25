import React from 'react';
import { AuthContext } from './hooks/authContext';
import Routes from './routes/index';

import './styles/global.scss';

const App: React.FC = () => (
    <AuthContext>
        <Routes />
    </AuthContext>
);

export default App;
