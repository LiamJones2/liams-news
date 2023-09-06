import { useState} from "react";
import UserContext from "./UserContext";

function UserProvider({children}) {
    const [user, setUser] = useState("Null user");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider