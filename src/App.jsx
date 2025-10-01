import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import About from './pages/About'
import Events from './pages/Events'
import Event1 from './pages/Events/Event1'
import Event2 from './pages/Events/Event2'
import Event3 from './pages/Events/Event3'
import Organizations from './pages/Organizations'
import Resources from './pages/Resources'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event1" element={<Event1 />} />
          <Route path="/event2" element={<Event2 />} />
          <Route path="/event3" element={<Event3 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
