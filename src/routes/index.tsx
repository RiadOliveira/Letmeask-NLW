import Home from '../pages/Home';
import NewRoom from '../pages/NewRoom';
import Room from '../pages/Room';
import AdminRoom from '../pages/Room/admin';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;