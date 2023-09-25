import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BoletimOcorrencia } from "./pages/Foods";

import { isAuthenticated } from './utils/is-authenticated';
import { TelaInicial } from "./pages/TelaInicial";
import { RegisterBoletimOcorrencia } from "./pages/BoletimOcorrencia";

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/telaInicial" element={<TelaInicial />} />
                <Route path="/register/boletimOcorrencia" element={<RegisterBoletimOcorrencia />} />
                <Route
                    path="/crud/boletimOcorrencia"
                    element={(
                        <PrivateRoute>
                            <BoletimOcorrencia />
                        </PrivateRoute>
                    )}
                />
            </Routes>
        </BrowserRouter>
    )
}
