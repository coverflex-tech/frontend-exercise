import styled from '@emotion/styled'

export default function HeaderStyle(theme) {
    
    const {brandColor01, brandColor02, bodyMaxWidth, padding04, padding05} = theme

    const Container = styled.header`
        //background-image: linear-gradient(138deg, ${brandColor01},  ${brandColor02});
    `

    const Content = styled.div`
        max-width: ${bodyMaxWidth};
        margin:auto;
        padding-top: ${padding05};
        padding-bottom: ${padding05};
        display: flex;
        align-items: center;
        gap: ${padding05};
        padding-left: ${padding05};
        padding-right: ${padding05};
        box-sizing: border-box;
        margin-bottom: ${padding04};
    `
    const Title = styled.h1`
        flex: 1;
        color: #526476;
        font-size: 26px;
        font-weight: 100;
    `
    

    return {Container, Content, Title}
}