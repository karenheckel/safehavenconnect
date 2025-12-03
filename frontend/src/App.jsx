import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Events from "./pages/Events";
import Organizations from "./pages/Organizations";
import Resources from "./pages/Resources";
import EventPage from "./pages/Events/EventPage";
import OrganizationPage from "./pages/Organizations/OrganizationPage";
import ResourcePage from "./pages/Resources/ResourcePage";
import NavigationBar from "./components/NavigationBar";
import SearchPage from "./pages/SearchPage";
import Visualizations from "./pages/Visualizations";
import DevVisualizations from "./pages/DevVisualizations";


function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/organizations/:id" element={<OrganizationPage />} />
        <Route path="/resources/:id" element={<ResourcePage />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/devvisualizations" element={<DevVisualizations />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
