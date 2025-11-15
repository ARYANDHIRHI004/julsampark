import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LayoutLoggedIn from "./components/LayoutLoggedIn";
import useAuthStore from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader2Icon, User } from "lucide-react";
import Dashboard from "./components/Dashboard";
import PumpControllers from "./pages/PumpControllers";
import AnalyticsAndReports from "./pages/AnalyticsAndReports";
import Alert from "./pages/Alert";
import UserQuery from "./pages/UserQuery";
import OperatoreForm from "./pages/OperaterForm";
import UserQueryPage from "./pages/UserQueryPage";
import AdminSideUserQueries from "./pages/AdminSideUserQueries";

function App() {
  const { authUser, getCurrentUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, []);


  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              !authUser ? (
                <HomePage />
              ) : authUser?.role === "admin" ? (
                <Navigate to={"/dashboard"} />
              ) : authUser?.role === "user" ? (
                <Navigate to={"/user"} />
              ) : (
                <Navigate to={"/operator"} />
              )
            }
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
        </Route>

        <Route path="/dashboard" element={<LayoutLoggedIn />}>
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/dashboard/pumpControllers"
            element={
              authUser ? (
                authUser?.role === "admin" && <PumpControllers />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/dashboard/analyticsAndReports"
            element={
              authUser ? (
                authUser?.role === "admin" && <AnalyticsAndReports />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/dashboard/alerts"
            element={
              authUser ? (
                authUser?.role === "admin" && <Alert />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/dashboard/usersFeedback"
            element={
              authUser ? (
                authUser?.role === "admin" && <AdminSideUserQueries />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Route>

        <Route path="/user" element={<Layout />}>
          <Route
            path="/user"
            element={authUser ? <UserQuery /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/user/:queryId"
            element={authUser ? <UserQueryPage /> : <Navigate to={"/login"} />}
          />
        </Route>


        <Route path="/operator" element={<Layout />}>
          <Route
            path="/operator"
            element={authUser ? <OperatoreForm /> : <Navigate to={"/login"} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
