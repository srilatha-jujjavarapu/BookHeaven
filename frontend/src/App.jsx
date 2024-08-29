import React, { useEffect } from 'react'
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import LogIn from './pages/LogIn'
import { SignUp } from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Favourites'
import UserOrderHistory from './components/UserOrderHistory'
import Settings from './components/Settings'
import AllOrders from './components/AllOrders'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
        <Navbar  />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />}>
          {role === "user" 
            ? (<Route index element={<Favourites />}/>) 
            : (<Route index element={<AllOrders />}/>)
          }
          {role === "admin" && (
            <Route path="/profile/addbook" element={<AddBook />} />
            
            )}
          <Route path="/profile/orderhistory" element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/updatebook/:id' element={<UpdateBook />} />
          <Route path='/view-book-details/:id' element={<ViewBookDetails />} />

        </Routes>
        <Footer />
    </div>
  )
}

export default App