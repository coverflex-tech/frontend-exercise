import styled from '@emotion/styled'

export default function UserCardStyle(theme) {
    
    const {color04, shadow01, bodyMaxWidth, padding04, padding05, radius02} = theme

    const Container = styled.div`
        background-color: ${color04};
        padding: ${padding04};
        box-sizing: border-box;
        border-radius: ${radius02};
        width: 100%;
        
        filter: drop-shadow( 0px 0px 8px ${shadow01});

        label {
            font-weight: bold;
            display:block;
        }
    `

    const Content = styled.div`
        max-width: ${bodyMaxWidth};
        margin:auto;
        padding-top: ${padding05};
        padding-bottom: ${padding05};
        display: flex;
        align-items: center;
        gap: ${padding05};
        padding-left: ${padding04};
        padding-right: ${padding04};
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