import styled from '@emotion/styled'

export default function ProductCardStyle(theme) {

    const { color04, shadow01, padding04, radius02 } = theme

    const Container = styled.div`
        background-color: ${color04};
        padding: ${padding04};
        box-sizing: border-box;
        border-radius: ${radius02};
        filter: drop-shadow( 0px 0px 8px ${shadow01});
        display: flex;
        cursor: pointer;
    `

    const Left = styled.div`
        flex: 1;
        label {
            display: block;
        }
    `

    const Right = styled.div`
    `

    return { Container, Left, Right }
}