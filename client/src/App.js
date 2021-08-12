import React from 'react';
// import axios from 'axios';
import './index.css';
import Routes from './pages/routes';
import LoginPage from './pages/Auth';
import Signup from './pages/signup';
import { Route } from 'react-router';


function App() {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  // 	const checkLogin = async () => {
  // 		const token = localStorage.getItem('tokenStore');
  // 		if (token) {
  // 			const verified = await axios.get(
  // 				'/user/verify',
  // 				{
  // 					headers: {
  // 						Authorization: token,
  // 					},
  // 				}
  // 			);
  // 			console.log(verified);
  //        setIsLogin(verified.data)

  //        if(!verified.data) return localStorage.clear()
  // 		} else {
  // 			setIsLogin(false);
  // 		}
  // 	};
  // 	checkLogin();
  // }, []);

  return (
    <div className='App'>
      {/* <LoginPage /> */}
      {/* <Signup /> */}
      <Routes />
    </div>
  );
}

export default App;
