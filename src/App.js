import { BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Main />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
