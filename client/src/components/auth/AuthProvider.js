import React, { useState } from "react";
const { Provider, Consumer } = React.createContext(false);

const AuthProvider = (props) => {
  const [data, setData] = useState(null);

  const googleLogIn = async (googleData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 201) return;
    const userData = await res.json();
    setData(userData);
  };

  const logOut = async () => {
    await fetch("/api/auth/logout", {
      method: "DELETE",
    });
    console.log("logout");
    setData(null);
    window.location.reload(false);
  };

  return (
    <Provider
      value={{
        user: data,
        googleLogIn: googleLogIn,
        logOut: logOut,
      }}
      {...props}
    />
  );
};

export { AuthProvider, Consumer as AuthConsumer };
