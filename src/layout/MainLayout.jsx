import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { AuthContent } from "../contexts/Authcontext";
import Loading from "../components/Loading/Loading";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUp } from "lucide-react";

const MainLayout = () => {
  // user login state
  const { setUser, loading, setLoading } = useContext(AuthContent);
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (loading) return <Loading></Loading>;

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop
        smooth
        component={
          <p
            id="scroll-to-top"
            style={{ color: "black", width: "40px", height: "40px", justifyContent: "center", alignItems: "center", display: "flex" }}
          >
            <ArrowUp></ArrowUp>
          </p>
        }
      />
    </>
  );
};

export default MainLayout;
