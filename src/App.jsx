import { Navigate, Route, Routes, Router } from "react-router-dom"
import { AuthProvider, useAuth } from './components/AuthContext';
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeScreen } from './routes/HomeScreen'
import { ProductScreen } from './routes/ProductScreen'
import { LoginScreen } from './routes/LoginScreen'
import { RegisterScreen } from './routes/RegisterScreen'
import { CarritoScreen } from './routes/CarritoScreen'
import { PrivateRoute } from './components/PrivateRoute'; // par amostrar las rutas protegidas
import './App.css'


export const App = () => {
  return (
    <AuthProvider>
        <Header />
          <Routes>
            {/* Rutas públicas */}
              <Route path='/*' element={ <Navigate to='/' ></Navigate>}></Route>
              <Route path='/login' element={ <LoginScreen></LoginScreen> }></Route>
              <Route path='/registro' element={ <RegisterScreen></RegisterScreen> }></Route>
              
              {/* Rutas protegidas */}
              <Route path='/' element={ <PrivateRoute><HomeScreen></HomeScreen></PrivateRoute>}></Route>
              <Route path='/productos' element={ <PrivateRoute><ProductScreen></ProductScreen></PrivateRoute> }></Route>
              <Route path='/carrito' element={ <PrivateRoute><CarritoScreen></CarritoScreen></PrivateRoute> }></Route>

              {/* Redirige a la página de login si no se encuentra la ruta */}
              <Route path="*" element={<LoginScreen />} />
          </Routes>
          <Footer />
    </ AuthProvider>
  )
}

