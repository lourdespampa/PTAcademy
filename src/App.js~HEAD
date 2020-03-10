import React from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';

import Contenido from './components/Contenido';
import Blockly from '../'
import ListaAlumnos from './pages/ListaAlumnos';
import Azar from './pages/Azar';
import Grupos from './pages/Grupos';
import Temporizador from './pages/Temporizador';
import Trivia from './pages/Trivia';
// import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Contenido>
        <Switch>
          <Route exact path="/lista" component={ListaAlumnos} />
          <Route exact path="/azar/:user" component={Azar} />
          <Route exact path="/grupos/:user" component={Grupos} />
          <Route exact path="/temporizador/:user" component={Temporizador} />
          <Route exact path="/trivia/:user" component={Trivia} />

          {/* <Route path="/404" component={NotFound} /> */}
          <Redirect from="/" to="/lista" />
        </Switch>
      </Contenido>
    </BrowserRouter>
  );
}

export default App;
