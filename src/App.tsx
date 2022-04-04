import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { setAccessToken } from "./accessToken";
import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { Router } from "./Components/Router";
import "./Styles/styles.css";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //This whole component is here to make sure that an accessToken is fetched when the page is reloaded (otherwise it falls out of memory on refresh)
    useEffect(() => {
        fetch(/*'https://guarded-oasis-23318.herokuapp.com/refresh_token'*/'http://localhost:5000/refresh_token', {
          method: 'POST',
          credentials: 'include',
        }).then(async ret => {
          const {accessToken} = await ret.json()
          setAccessToken(accessToken)
          setLoading(false);
        }).catch((err) => {
          console.log(err);
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

