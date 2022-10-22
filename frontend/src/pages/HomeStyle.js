import styled from '@emotion/styled'

export default function HomeStyle(theme) {

    const { padding05, padding06 } = theme

    const Layout = styled.div`
       display: flex;
        align-items:start;
        gap: ${padding06};
    `
    const Products = styled.div`
        flex:1;
    `
    const ProductList = styled.div`
        display: grid;
        @media (max-width: 800px) {
            grid-template-columns: repeat(1, minmax(1px, 1fr));
            row-gap: ${padding05};
            column-gap: ${padding05};
        }
        @media (min-width: 801px) {
            grid-template-columns: repeat(2, minmax(1px, 1fr));
            row-gap: ${padding05};
            column-gap: ${padding05};
        }
    `

    const Right = styled.div`
        display: flex;
        flex-direction: column;
        align-items:start;
        width: 280px;
      
    `
    return { Layout, Products, Right, ProductList }
}