// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import theme from './theme';
import Login from './Login';
import Signup from './SignUp';
import Home from './Home';
import DashboardOne from './DashboardOne';
import ClubSearch from './ClubSearch';
import PreviewPage from './PreviewPage';
import ClubLeaderPage from './ClubLeaderPage';
import CreateClub from './CreateClub';
import WorkingPage from './WorkingPage';
import DashboardTwo from './DashboardTwo';
import Dashboard from './Dashboard';
import MissionCompletionPage from './MissionCompletionPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/DashboardOne' element={<DashboardOne />}/>
          <Route path='/ClubSearch' element={<ClubSearch/>}/>
          <Route path='/PreviewPage' element={<PreviewPage/>}/>
          <Route path='/ClubLeaderPage' element={<ClubLeaderPage/>}/>
          <Route path='/CreateClub' element={<CreateClub/>}/>
          <Route path='/WorkingPage' element={<WorkingPage/>}/>
          <Route path='/DashboardTwo' element={<DashboardTwo/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/MissionCompletionPage' element={<MissionCompletionPage/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;