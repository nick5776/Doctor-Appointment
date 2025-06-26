
/*
axios is a library used to make HTTP requests (GET, POST, PUT, DELETE) from your frontend React app to a backend server or API.
react-router-dom lets you navigate between pages (components) in a React app without reloading the page.
Ant Design (AntD) is a popular React UI component library that provides ready-to-use, visually consistent, and responsive components like:
Buttons Forms Tables Date-pickers Layouts Notifications
*/
//require wala format yaha use kaam nhi krta
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux'; //To read values from the global Redux state
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Doctors from './pages/admin/Doctors';
import Users from './pages/admin/Users';
import Profile from './pages/Doctors/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Doctors/DoctorAppointments';

/*
Login/Register pages that should NOT be visible if the user is already logged in.
A Homepage that should be visible only to logged-in users. handled by public and protected routes

why this is required
In backend apan auth middleware banate h to check ki user ko /profile pe jane du kya agr logged in h toh hi jane duga
but agr wo user logged in and again wo /login pe jana chahata h toh wo tu frontend se handle kr le

Ques - if a user is logged in and user want to again go to /login, can I redirect him to /homepage by writing code in backend?

Ans- No, React is a Single Page Application (SPA). That means:
React Router handles which component (page) to show — not the backend.
So when a user visits /login, React (not the backend) decides what to render based on the current token or state.
*/

function App() {
  const loading = useSelector((state) => state.alerts.loading);
  return (
    <BrowserRouter>
    {loading ? <Spinner /> :
      <Routes> 

        <Route path="/login" element={ //user wants to go to login page, acc to public route if user has token it will automatically gets redirected to home page.
          <PublicRoutes>
            <Login />
          </PublicRoutes>
          } />  
        <Route path="/register" element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>  
          } />   
        <Route path="/apply-doctor" element={
          <ProtectedRoutes>
            <ApplyDoctor />
          </ProtectedRoutes>
          } />
        <Route path="/notification" element={
          <ProtectedRoutes>
            <NotificationPage />
          </ProtectedRoutes>
          } />
        <Route path="/admin/doctors" element={
          <ProtectedRoutes>
            <Doctors />
          </ProtectedRoutes>
          } />
        <Route path="/admin/users" element={
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
          } />
        <Route path="/doctor/profile/:id" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
          } />
        <Route path="/doctor/book-appointment/:doctorId" element={
          <ProtectedRoutes>
            <BookingPage />
          </ProtectedRoutes>
          } />
        <Route path="/appointments" element={
          <ProtectedRoutes>
            <Appointments />
          </ProtectedRoutes>
          } />
        <Route path="/doctor-appointments" element={
          <ProtectedRoutes>
            <DoctorAppointments />
          </ProtectedRoutes>
          } />
        <Route path="/" element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
          } />    
      </Routes>
    }
    </BrowserRouter>
  );
}
export default App;
