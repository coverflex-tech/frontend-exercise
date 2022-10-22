import { TextField, Button } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'

import { useAppContext } from '../context/AppContext'
import DefaultMasterpage from '../masterpages/DefaultMasterpage'
import api from '../services/api'
import LoginStyle from './LoginStyle'

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function Login() {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const { theme, login } = useAppContext()
    const { LoginBox } = useMemo(() => LoginStyle(theme), [theme])

    async function handleSubmit() {
        console.log(username)
        if (validateEmail(username)) {
            setLoading(true)
            setUsernameError(false)

            const user = await api.getUser(username);
            login(user)

        } else {
            setUsernameError(true)
        }
    }

    return (
        <DefaultMasterpage title="Login" loading={loading}>
            <LoginBox>
                <TextField error={usernameError} onChange={(e) => { setUsername(e.target.value) }}
                    id="outlined-basic" label="Username" variant="outlined" color="primary" fullWidth={true}
                    />
                <Button variant="outlined" fullWidth={true} onClick={() => handleSubmit()} disabled={loading}>Login</Button>
            </LoginBox>
        </DefaultMasterpage>
    )
}

