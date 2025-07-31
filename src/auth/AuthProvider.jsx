import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isBusy, setIsBusy] = useState(true);

  const handleLogin = (userInfo, authToken) => {
    setIsBusy(true);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setCurrentUser(userInfo);
    setIsBusy(false);
  };

  const handleLogout = () => {
    setIsBusy(true);
    localStorage.clear(); // clears both 'user' and 'token'
    setCurrentUser(null);
    setIsBusy(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userJSON = localStorage.getItem("user");

    if (storedToken && userJSON) {
      setCurrentUser(JSON.parse(userJSON));
    } else {
      handleLogout();
    }

    setIsBusy(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser, // ✅ Added this line
        login: handleLogin,
        logout: handleLogout,
        loading: isBusy,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
