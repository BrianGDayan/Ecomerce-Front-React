import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeScreen } from './routes/HomeScreen'
import { ProductScreen } from './routes/ProductScreen'
import { LoginScreen } from './routes/LoginScreen'
import { RegisterScreen } from './routes/RegisterScreen'
import { CarritoScreen } from './routes/CarritoScreen'
import { CarritoProvider } from "./context/CarritoProvider"
import { ProductosProvider } from "./context/ProductosProvider"
import './App.css'


export const App = () => {
  return (
    <ProductosProvider>
    <CarritoProvider>
        <Header />
          <Routes>
            <Route path='/' element={ <HomeScreen></HomeScreen> }></Route>
            <Route path='/productos' element={ <ProductScreen></ProductScreen> }></Route>
            <Route path='/login' element={ <LoginScreen></LoginScreen> }></Route>
            <Route path='/registro' element={ <RegisterScreen></RegisterScreen> }></Route>
            <Route path='/carrito' element={ <CarritoScreen></CarritoScreen> }></Route>
            <Route path='/*' element={ <Navigate to='/' ></Navigate>}></Route>
          </Routes>
        <Footer />
      </CarritoProvider>
    </ProductosProvider>
  )
}

