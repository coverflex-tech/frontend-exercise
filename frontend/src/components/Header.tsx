import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import HeaderStyle from './HeaderStyle'

export default function Header({title} : any) {
    const { theme } = useAppContext()
    const { Container, Content, Title } = useMemo(() => HeaderStyle(theme), [theme])


    return (
        <Container>
            <Content>
                <Title>{title}</Title>
                <img src="https://global-uploads.webflow.com/5fa58ed80f7ccd723ba35f77/5fa58ed80f7ccd5583a35f81_logo.svg" loading="lazy" alt="Logo da Coverflex - Benefícios flexíveis" />
            </Content>
        </Container>
    )
}

