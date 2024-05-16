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
<<<<<<< HEAD
import ClubLeaderPage from './ClubLeaderPage';
=======
import CreateClub from './CreateClub';
>>>>>>> 98f16f3d13c049aa875d2325a5ffc427c443c3bf

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
<<<<<<< HEAD
          <Route path='/ClubLeaderPage' element={<ClubLeaderPage/>}/>
=======
          <Route path='/CreateClub' element={<CreateClub/>}/>
>>>>>>> 98f16f3d13c049aa875d2325a5ffc427c443c3bf
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;