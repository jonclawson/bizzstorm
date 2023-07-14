import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import App from './App';
import PlanScreen from './screens/PlanScreen';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/search/:keyword' element={<HomeScreen />} />
        <Route path='/page/:pageNumber' element={<HomeScreen />} />
        <Route
          path='/search/:keyword/page/:pageNumber'
          element={<HomeScreen />}
        />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        {/* Registered users */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/plan/:id' element={<PlanScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>
        {/* Admin users */}
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        </Route>
      </Route>
    )
  );

