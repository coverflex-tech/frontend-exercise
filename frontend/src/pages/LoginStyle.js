import styled from '@emotion/styled'

export default function LoginStyle(theme) {
    
    const {brandColor02, padding05, bodyMaxWidth, radius03, color04} = theme

  
    const LoginBox = styled.div`
        width: 400px;
        background-color: ${color04};
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        padding: ${padding05};
        box-sizing: border-box;
        border-radius: ${radius03};
        gap: ${padding05};
    `
    return {LoginBox}
}