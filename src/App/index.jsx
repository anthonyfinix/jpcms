import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Content';
const App = () => {
    return (
        <>
            <Header />
            <div className="content-wrapper">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default App;