import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContext } from './hooks/auth';

import './styles/global.scss';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContext>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
