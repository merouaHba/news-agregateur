import { createContext, useState } from "react";
export const UserStore = createContext({});
const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <UserStore.Provider value={{ user, setUser }}>
      {children}
    </UserStore.Provider>
  );
};

export default UserProvider;
