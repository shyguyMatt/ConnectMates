import logo from './logo.svg';
import './styles/App.css';

import Header from './componants/elements/Header';
import Footer from './componants/elements/Footer';
import Home from './componants/pages/Home';

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
