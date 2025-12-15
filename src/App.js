import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/page/Home/Home';
import Navigation from './components/common/Navigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile from './components/Profile/Profile';
import Orders from './components/page/Order';
import CategoryPage from './components/page/CategoryPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Navigation>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/profile' }element={<Profile />} />
          <Route path={'/Orders' }element={<Orders />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </Navigation>
    </>
  );
}

export default App