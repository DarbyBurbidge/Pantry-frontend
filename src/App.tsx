import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { setAccessToken } from "./utils/accessToken";
import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { Router } from "./Components/Router";
import env from "./env"
import "./Styles/styles.css";


export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //This whole component is here to make sure that an accessToken is fetched when the page is reloaded
  // (otherwise it falls out of memory on refresh)
    useEffect(() => {
        fetch(`https://${env.backendIp}:${env.backendPort}/refresh`, {
          method: 'POST',
          credentials: 'include',
        }).then(async ret => {
          const {accessToken} = await ret.json()
          setAccessToken(accessToken)
          setLoading(false);
        }).catch((err) => {
          console.error(err);
        });
    }, [])


  /* This is a pre-render to bring the LCP up to green
  passing 'loading' prevents accidentally querying without an accessToken */
  if (loading) {
    return (<>
        <Header skip={loading}/>
        <div className="body"><Oval color="#222222" secondaryColor="#AAAAAA" height={200} width={200} /></div>
        <div className="footer"></div>
      </>
    )
  }
  return (
    <>
      <Header skip={loading}/>
      <Router />
      <Footer />
    </>
  );
}

