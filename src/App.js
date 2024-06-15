import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import MissionCompletionPage from './MissionCompletion';
import MissionVerification from './MissionVerification';
import Checkout from './Checkout';
import Mission1Page from './Mission1Page';
import Mission2Page from './Mission2Page';
import MissionManager from './MissionManager';
import ConnectWallet from './ConnectWallet';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/DashboardOne' element={<DashboardOne />} />
          <Route path='/ClubSearch' element={<ClubSearch />} />
          <Route path='/PreviewPage' element={<PreviewPage />} />
          <Route path='/ClubLeaderPage' element={<ClubLeaderPage />} />
          <Route path='/CreateClub' element={<CreateClub />} />
          <Route path='/WorkingPage' element={<WorkingPage />} />
          <Route path='/DashboardTwo' element={<DashboardTwo />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/MissionCompletionPage' element={<MissionCompletionPage />} />
          <Route path='/MissionVerification' element={<MissionVerification />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/Mission1/*' element={<Mission1Page />} />
          <Route path='/Mission2/*' element={<Mission2Page/>}/>
          <Route path='/MissionManager' element={<MissionManager/>}/>
          <Route path='/ConnectWallet' element={<ConnectWallet/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
