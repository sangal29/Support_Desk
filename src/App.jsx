import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/SignUp/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Tickets from './components/Tickets/Tickets';
import CreateTicket from './components/CreateTicket/CreateTicket';
import TicketDetails from './components/TicketDetails/TicketDetails';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path='/' element={<Navigate to='/login' />} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/create-ticket' element={<CreateTicket />} />
          <Route path='/tickets/:id' element={<TicketDetails />} />
          <Route path='/tickets/edit/:id' element={<CreateTicket />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
