import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

// Create context
export const AuthContent = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login handler
  const handelLogin = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
        toast.success("লগইন সফল হয়েছে!");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            toast.error("এই ইমেইলটির সাথে কোন ব্যবহারকারী খুঁজে পাওয়া যায়নি");
            break;
          case "auth/wrong-password":
            toast.error("ভুল পাসওয়ার্ড দিয়েছেন");
            break;
          case "auth/invalid-email":
            toast.error("সঠিক ইমেইল ঠিকানা দিন");
            break;
          case "auth/too-many-requests":
            toast.error("অনেকবার চেষ্টা করেছেন। কিছুক্ষণ পর আবার চেষ্টা করুন");
            break;
          default:
            toast.error("লগইন ব্যর্থ হয়েছে: " + errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  //  google login handeler
  const googleProvider = new GoogleAuthProvider();
  const handelGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUser(user);
      toast.success("লগইন সফল হয়েছে!");
      return user; // ✅ RETURN user
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case "auth/popup-closed-by-user":
          toast.error("পপআপ বন্ধ হয়ে গেছে");
          break;
        case "auth/popup-blocked":
          toast.error("পপআপ ব্লক হয়েছে");
          break;
        default:
          toast.error("লগইন ব্যর্থ হয়েছে: " + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  //  github login handeler
  const githubloginProvider = new GithubAuthProvider();
  const handelGitLogin = async () => {
    setLoading(true);
    return signInWithPopup(auth, githubloginProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("লগইন সফল হয়েছে!");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/popup-closed-by-user":
            toast.error("পপআপ বন্ধ হয়ে গেছে");
            break;
          case "auth/popup-blocked":
            toast.error("পপআপ ব্লক হয়েছে");
            break;
          default:
            toast.error("লগইন ব্যর্থ হয়েছে: " + errorMessage);
        }
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  // Register handler
  const handelRegister = async (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: name }).then(() => {
       
          setUser(user);
          toast.success("ব্যবহারকারী সফলভাবে তৈরি হয়েছে");
          setLoading(false);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            toast.error("এই ইমেইলটি ইতোমধ্যে ব্যবহৃত হয়েছে");
            break;
          case "auth/invalid-email":
            toast.error("ইমেইলটি সঠিক নয়");
            break;
          case "auth/weak-password":
            toast.error("পাসওয়ার্ডটি দুর্বল");
            break;
          default:
            toast.error("একটি সমস্যা ঘটেছে: " + errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  // Logout handler
  const handelLogOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("লগআউট সফল হয়েছে");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("লগআউট ব্যর্থ হয়েছে: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const passwordReset = (email) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            toast.error("এই ইমেইলটির সাথে কোন ব্যবহারকারী খুঁজে পাওয়া যায়নি");
            break;
          case "auth/invalid-email":
            toast.error("সঠিক ইমেইল ঠিকানা দিন");
            break;
          default:
            toast.error("পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে: " + errorMessage);
        }
      });
  };

  // Context values
  const contextValues = {
    user,
    setUser,
    loading,
    setLoading,
    handelLogin,
    handelRegister,
    handelLogOut,
    handelGoogleLogin,
    handelGitLogin,
    passwordReset,
  };

  return <AuthContent.Provider value={contextValues}>{children}</AuthContent.Provider>;
};

export default AuthProvider;
