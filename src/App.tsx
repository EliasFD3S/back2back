import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Experience } from './components/b2b/experience'
import { SizeGuide } from './components/b2b/size-guide'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experience />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="*" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  )
}
