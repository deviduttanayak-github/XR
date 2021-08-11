import React from 'react';
// import axios from 'axios';
import './index.css';

import LoginPage from './pages/Auth';

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
      <LoginPage />
    </div>
  );
}

export default App;
