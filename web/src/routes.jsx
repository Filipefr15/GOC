import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BoletimOcorrencia } from "./pages/Foods";

import { isAuthenticated } from './utils/is-authenticated';
import { TelaInicial } from "./pages/TelaInicial";
import { RegisterBoletimOcorrencia } from "./pages/BoletimOcorrencia";
import PieChart from "./pages/testepage";
import OcorrenciaChart from "./pages/testepage";
import { Dashboard } from "./pages/Dashboard";
import { Perfil } from "./pages/Perfil";
import { EditarPerfil } from "./pages/EditarPerfil";

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
                <Route path="/pieChart" element={<Dashboard />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editperfil" element={<EditarPerfil />} />
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
