import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./Footer/Footer"
import { Header } from "./Header/Header"
import { Hello } from "./Hello/Hello"
import { Home } from "./Home/Home"
import { Login } from "./Login/Login"
import { NA } from "./NA/NA"


export const Router: React.FC = () => {
    return (    
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hello" element={<Hello />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NA />} />
                </Routes>    
                <Footer />
        </BrowserRouter>
    )
}