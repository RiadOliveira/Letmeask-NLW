import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from './hooks/auth';

import './styles/global.scss';
import Room from './pages/Room';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
