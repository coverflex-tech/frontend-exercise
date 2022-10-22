import React, { useMemo } from 'react'
import Header from '../components/Header'
import { useAppContext } from '../context/AppContext'
import DefaultMasterpageStyle from './DefaultMasterpageStyle'
import CircularProgress from '@mui/material/CircularProgress';

export default function DefaultMasterpage({ children, title, loading=false }: any) {
    const { theme } = useAppContext()
    const { Container, Content, Loading } = useMemo(() => DefaultMasterpageStyle(theme), [theme])
    return (
        <>
            <Container>
                <Header title={title} />
                <Content>
                    {children}
                </Content>
            </Container>
            {loading &&
                <Loading>
                    <CircularProgress size={77} />
                </Loading>
            }
        </>
    )
}