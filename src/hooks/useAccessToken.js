import { useEffect, useState } from "react"

const useAccessToken = email => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.newAccessToken) {
                        localStorage.setItem('newAccessToken', data.newAccessToken)
                        setToken(data.newAccessToken)
                    }
                })
        }
    }, [email]);
    return [token];
}

export default useAccessToken;