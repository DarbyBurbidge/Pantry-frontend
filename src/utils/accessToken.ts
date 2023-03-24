import env from "../env"

export let accessToken = "";

export const setAccessToken = (token: string) => {
    accessToken = token
}

export const getAccessToken = () => {
    return accessToken
}

export const fetchAccessToken = () => {
    fetch(`https://${env.backendIp}:${env.backendPort}/refresh`, {
        method: 'POST',
        credentials: 'include',
    }).then(async ret => {
        const {accessToken} = await ret.json()
        setAccessToken(accessToken)
    }).catch((err) => {
        console.error(err);
    });
}