import { DndProvider } from 'react-dnd'
import Panel from './components/Panel'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
const isMobile = window.innerWidth <= 768;
function App() {
  document.title = 'CATered Care'
  return (
    <DndProvider backend={isMobile? TouchBackend: HTML5Backend}>
      <Panel/>
    </DndProvider>
  )
}

export default App
