import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import About from './pages/About'
import Events from './pages/Events'
import Event1 from './pages/Events/Event1'
import Event2 from './pages/Events/Event2'
import Event3 from './pages/Events/Event3'
import Organizations from './pages/Organizations'
import Organizations1 from './pages/Organizations/Organization1'
import Organizations2 from './pages/Organizations/Organization2'
import Organizations3 from './pages/Organizations/Organization3'
import Resources from './pages/Resources'
import Resource1 from './pages/Resources/resource1'
import Resource2 from './pages/Resources/resource2'
import Resource3 from './pages/Resources/resource3'
import EventPage from './pages/Events/EventPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/organization1" element={<Organizations1 />} />
          <Route path="/organization2" element={<Organizations2 />} />
          <Route path="/organization3" element={<Organizations3 />} />
          <Route path="/resource1" element={<Resource1 />} />
          <Route path="/resource2" element={<Resource2 />} />
          <Route path="/resource3" element={<Resource3 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
