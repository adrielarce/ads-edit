import React, { useState } from "react";
import AzureAuthenticationButton from "./azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";
import MainForm from "./components/MainForm";

function App() {
  // current authenticated user
  const [currentUser, setCurrentUser] = useState<AccountInfo>();

  // authentication callback
  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  return (
    <div id="App">
      <h2>Microsoft Login Button application</h2>
      <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
      {currentUser && (
        <div>
          <MainForm />
        </div>
      )}
    </div>
  );
}

export default App;