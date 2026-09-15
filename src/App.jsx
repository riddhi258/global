import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import Home from "./Pages/Home.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Work from "./Pages/Work.jsx";
import Migration from "./Pages/Migration.jsx";
import Dependent from "./Pages/Dependent.jsx";
import Visitor from "./Pages/Visitor.jsx";
import Student from "./Pages/Student.jsx";
import Videos from "./Pages/Videos.jsx";
import English from "./Pages/English.jsx";
import Ielts from "./Pages/Ielts.jsx";
import PTE from "./Pages/PTE.jsx";
import TOEFL from "./Pages/TOEFL.jsx";
import Duolingo from "./Pages/Duolingo.jsx";
import Cambridge from "./Pages/Cambridge.jsx";
import Acadmic from "./Pages/Acadmic.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import News from "./Pages/News.jsx";
import NewsArticle from "./Pages/NewsArtical.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/who-we-are" element={<AboutUs />} />

        <Route path="/services/work-visa" element={<Work />} />
        <Route path="/services/migration-visa" element={<Migration />} />
        <Route path="/services/dependent-visa" element={<Dependent />} />
        <Route path="/services/visitor-visa" element={<Visitor />} />
        <Route path="/services/student-visa" element={<Student />} />

        <Route path="/latest-update/videos" element={<Videos />} />
        <Route path="/latest-update/news" element={<News/>} />
        <Route path="/news/:slug/" element={<NewsArticle />} />


        <Route path="/english-test" element={<English />} />
        <Route path="/english-test/ielts" element={<Ielts />} />
        <Route path="/english-test/pte" element={<PTE />} />
        <Route path="/english-test/toefl" element={<TOEFL/>} />
        <Route path="/english-test/duolingo" element={<Duolingo/>} />
        <Route path="/english-test/cambridge-c1-advanced" element={<Cambridge/>} />
        <Route path="/english-test/languagecert-academic" element={<Acadmic/>} />
        <Route path="/contact" element={<ContactUs/>}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;