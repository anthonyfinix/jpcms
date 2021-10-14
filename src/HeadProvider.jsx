import { Helmet,HelmetProvider } from "react-helmet-async";
const HeadProvider = ({children}) => {
    return (
        <HelmetProvider>
                <Helmet>
                    <title>Catalog</title>
                </Helmet>
                {children}
        </HelmetProvider>
    )
}
export default HeadProvider;