// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import theme from './theme';
import Login from './Login';
import Signup from './SignUp';
import Home from './Home';
import Dashboard from './Dashboard';
import ClubSearch from './ClubSearch';
import PreviewPage from './PreviewPage';
import CreateClub from './CreateClub';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Dashboard' element={<Dashboard />}/>
          <Route path='/ClubSearch' element={<ClubSearch/>}/>
          <Route path='/PreviewPage' element={<PreviewPage/>}/>
          <Route path='/CreateClub' element={<CreateClub/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;