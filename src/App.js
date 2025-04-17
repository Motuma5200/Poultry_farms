
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginsignUp from './pages/LoginSignUp';
import Login from './pages/Login';
import Product  from './pages/Product';
import ProductCategory from './pages/ProductCategory';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Footer from './components/footer/Footer';
import meat_banner from './components/Asset/banner_mens.png'
import egg_banner from './components/Asset/banner_women.png'
import tool_banner from './components/Asset/banner_kids.png' 

function App() {
  return (
    <div className="App">

      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path='/' element = {<Shop/>}/>
          <Route path='/meat' element = {<ProductCategory banner = {meat_banner} category = "meat"/>}/>
          <Route path='/eggs' element = {<ProductCategory banner = {egg_banner} category = "egg"/>}/>
          <Route path='/tools' element = {<ProductCategory banner = {tool_banner} category = "tool"/>}/>  
          <Route path='/product' element = {<Product/>}>
            <Route path=':productId' element = {<Product/>}/>
          </Route>
          <Route path='/cart' element = {<Cart/>}/>
          <Route path='/signup' element ={<LoginsignUp/>}/>
          <Route path='/login' element = {<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
