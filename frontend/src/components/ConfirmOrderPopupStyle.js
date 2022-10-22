import styled from '@emotion/styled'

export default function HeaderStyle(theme) {

    const { padding02, shadow01, padding04, radius02, color04 } = theme

    const Container = styled.header`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(208, 208, 214, 0.9);
    `

    const Popup = styled.div`
        position: absolute;
        left: calc(50% - 250px);
        top: 20%;
        width: 500px;
        background-color: ${color04};
        border-radius: ${radius02};
        overflow: hidden;
        filter: drop-shadow( 0px 0px 8px ${shadow01});
    `

    const Title = styled.div`
        width: 100%; 
        background-image: linear-gradient(138deg,#fe685b,#ff8b81);
        color: ${color04};
        padding-left: ${padding04};
       
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 100;

        span {
            flex: 1;
        }
    `

    const Content = styled.div`
        width: 100%; 
        min-heith: 180px;
        padding: ${padding04};
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
    `

    const ActionBar = styled.div`
        width: 100%; 
        min-heith: 80px;
        padding: ${padding04};
        box-sizing: border-box;
    `
    const Row = styled.div`
        display: flex;
        padding-top: ${padding02};
        padding-bottom: ${padding02};
        label {
            flex: 1;
        }
        span {
            font-weight: bold;
        }
    `
    const Close = styled.div` 
        min-height: 70px;
        min-width: 70px;
        display:flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: rgba(0,0,0,.1);
        }
    `



    return { Container, Popup, Title, Content, ActionBar, Row, Close }
}