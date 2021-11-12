import React from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";

//import logo from './logo.svg';


//CSS
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

//Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import WavesPortal from './components/WavesPortal/WavesPortal';
import Explore from './components/Explore/Explore';



function App() {
    return (
        <Router>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    <Route exact path="/" element={<Main/>} />
                    <Route path="/wave" element={<WavesPortal/>} />
                    <Route path="/explore" element={<Explore/>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
