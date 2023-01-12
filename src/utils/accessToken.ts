
export let accessToken = "";

export const setAccessToken = (token: string) => {
    accessToken = token
}

export const getAccessToken = () => {
    return accessToken
}

export const fetchAccessToken = () => {
    fetch('http://localhost:5000/refresh_token', {
        method: 'POST',
        credentials: 'include',
    }).then(async ret => {
        const {accessToken} = await ret.json()
        setAccessToken(accessToken)
        console.log(accessToken)
    }).catch((err) => {
        console.log(err);
    });
}