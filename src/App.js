import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import Gallery from "./components/gallery/Gallery";
import Contact from "./components/Contact/Contact";
import About from "./components/about/About";
import Service from "./components/services/Service";
import Resources from "./components/resources/Resources";
import Venture from "./components/ventures/Venture";
import RegisterNGO from "./components/register/NGOForm";
import RegisterApplicant from "./components/register/ApplicantForm";
import ReceptionistForm from "./components/receptionist/ReceptionistForm";


function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service/:id" element={<Service/>}/>
        <Route path="/resource/:id" element={<Resources/>}/>
        <Route path="/venture/:id" element={<Venture/>}/>
        <Route path="/register/ngo" element={<RegisterNGO />} />
        <Route path="/register/applicant" element={<RegisterApplicant />} />
        <Route path="/receptionist" element={<ReceptionistForm />} />
      </Routes>
    </Router>
  );
}

export default App;