import './App.css';
import Home from './components/Home';

import {getAnalytics} from 'firebase/analytics'
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './analytics.config';
import {setAnalytics} from './utils/analytics';

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
if (process.env.NODE_ENV === 'production') {
  setAnalytics(getAnalytics(app));
}



function App() {
  return (
    <div className="App">
          <Home></Home>
    </div>
  );
}

export default App;
