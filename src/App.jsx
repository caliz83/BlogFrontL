//To create from CMD line:
  //type: npm create vite@4.1.0
  //name project & packet
  //choose React
  //choose JS (in this case)
  //cd in project
  //type: npm install
  //npm run dev, type 'o' to open it, then 'q' to exit it
  //to open in VS Code, type: code .

import './App.css'
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="App">
      <h1>Our Blog</h1>
      <Dashboard />
    </div>
  )
}

export default App
