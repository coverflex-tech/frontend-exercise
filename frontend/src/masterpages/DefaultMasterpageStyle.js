import styled from '@emotion/styled'

export default function DefaultMasterpageStyle(theme) {
    
    const {padding05, bodyMaxWidth} = theme

    const Container = styled.div`
        
    `
    const Content = styled.div`
        max-width: ${bodyMaxWidth};
        margin:auto;
        padding-left: ${padding05};
        padding-right: ${padding05};
        box-sizing: border-box;

    `

    const Loading = styled.div`
        top: 0;
        left: 0;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `

    return {Container, Content, Loading}
}