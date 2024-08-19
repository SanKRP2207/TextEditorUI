
import { useState } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRouter from './components/PrivateRouter';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [value, setValue] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />

          <Route element={<PrivateRouter />}>
            <Route path='/' element={<TextEditor setValue={setValue} value={value} />} />
          </Route>

          <Route path="*" element={<h1>404 Page Not Found</h1>} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
