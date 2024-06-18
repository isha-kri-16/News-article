import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import NewsBoard from './components/NewsBoard';
import { fetchNews } from './redux/features/newsSlice'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews("general"));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <NewsBoard />
    </>
  );
}

export default App;
