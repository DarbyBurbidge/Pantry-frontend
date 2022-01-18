import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import { Router } from "./Components/Router";
import "./App.css";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //This whole component is here to make sure that an accessToken is fetched when the page is reloaded (otherwise it falls out of memory on refresh)
    useEffect(() => {
        fetch('http://localhost:5000/refresh_token', {
            method: 'POST',
            credentials: 'include'
        }).then(async ret => {
            const {accessToken} = await ret.json()
            setAccessToken(accessToken)
            setLoading(false);
        });
    }, [])

  if (loading) {
    return (
      <div>loading...</div>
    )
  }
  return (
      <Router />
    );
}

