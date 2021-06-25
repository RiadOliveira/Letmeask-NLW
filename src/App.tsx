import { AuthContext } from './hooks/authContext';
import Routes from './routes/index';

import './styles/global.scss';

const App = () => (
      <AuthContext>
        <Routes />
      </AuthContext>
);

export default App;
