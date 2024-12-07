import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails} from './store/userSlice';// Correct import


function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />

      <main className="min-h-[80vh]">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
