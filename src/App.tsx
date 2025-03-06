import { DndProvider } from 'react-dnd'
import Panel from './components/Panel'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  document.title = 'CATered Care'
  return (
    <DndProvider backend={HTML5Backend}>
      <Panel/>
    </DndProvider>
  )
}

export default App
