import { createContext, useContext, useState } from "react";

// Import avatars
import avatar1 from "/images/Three.png";
import avatar2 from "/images/Four.png";
import avatar3 from "/images/Five.png";
import avatar4 from "/images/Six.png";

// ---------------- TEAM CONTEXT ----------------
const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Joe Doe",
      phone: "+1 (000) 000-0000",
      email: "example@gmail.com",
      role: "Admin",
      avatar: avatar1,
    },
    {
      id: 2,
      name: "Joe Doe",
      phone: "+1 (000) 000-0000",
      email: "example@gmail.com",
      role: "Member",
      avatar: avatar2,
    },
    {
      id: 3,
      name: "Joe Doe",
      phone: "+1 (000) 000-0000",
      email: "example@gmail.com",
      role: "Member",
      avatar: avatar3,
    },
    {
      id: 4,
      name: "Joe Doe",
      phone: "+1 (000) 000-0000",
      email: "example@gmail.com",
      role: "Member",
      avatar: avatar4,
    },
  ]);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// ---------------- HOOK EXPORT ----------------
export const useTeam = () => useContext(TeamContext);
