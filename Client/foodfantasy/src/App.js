import {Routes, Route, Outlet} from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './pages/RecipeDetail';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function Layout(){
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </>
  )
}
function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='recipes/:id' element={<RecipeDetail />} />
         <Route path='/signup' element={<SignUp />}/>
         <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;