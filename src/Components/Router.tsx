import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NA } from "./NA/NA"
import { ShoppingList } from "./ShoppingList/ShoppingList";
import { WelcomePage } from "./WelcomePage/WelcomePage";
const Home = lazy(() => import("./Home/Home"));


export const Router: React.FC = () => {
    return (    
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/home" element={<Suspense fallback={<div className="body">loading... Home</div>} ><Home /></Suspense>} />
                    <Route path="/shopping-list" element={<ShoppingList />} />
                    <Route path="/*" element={<NA />} />
                </Routes>    
        </BrowserRouter>
    )
}