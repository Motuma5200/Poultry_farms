
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
import meat_banner from './components/Asset/meat_banner.png'
import egg_banner from './components/Asset/egg_banner.png'
import tool_banner from './components/Asset/tool_banner.png' 
//import Banner from './components/Asset/Banner';

function App() {
  
 const banners = [meat_banner, egg_banner,tool_banner];
  return (
    <div className="App">

      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path='/' element = {<Shop/>}/>
          <Route path='/meat' element = {<ProductCategory banner = {banners} category = "meat"/>}/>
          <Route path='/eggs' element = {<ProductCategory banner = {banners} category = "egg"/>}/>
          <Route path='/tools' element = {<ProductCategory banner = {banners} category = "tool"/>}/>  
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
