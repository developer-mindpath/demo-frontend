import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
// Import the ProfilePage component
import SignIn from './pages/signIn/signIn';
import Profile from './pages/profile/profile';
import 'App.css';
import SignUp from './pages/signUp/signUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" replace />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* <Route path="/landing" element={<LandingPage />} /> */}
        <Route path="/profile" element={<Profile />} />{' '}
        {/* Add the ProfilePage route */}
      </Routes>
    </Router>
  );
};

export default App;
