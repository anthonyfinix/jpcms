import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Content';
const App = () => {
    return (
        <div className="App">
            <Header />
            <div className="content-wrapper">
                <Sidebar />
                <Content />
            </div>
        </div>
    )
}
export default App;