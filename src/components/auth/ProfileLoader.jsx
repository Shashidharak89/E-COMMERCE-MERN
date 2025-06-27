import { useEffect, useContext } from 'react';
import axios from 'axios';
import SampleContext from '../../contexts/SampleContext'; // adjust path if needed

const ProfileLoader = () => {
  const {
    URL,
    userId, setUserId,
    username, setUsername,
    mail, setMail,
    islogin, setIslogin
  } = useContext(SampleContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIslogin(false);
        return;
      }

      try {
        const res = await axios.get(`${URL}/api/auth/profile/${token}`);
        const user = res.data.user;

        setUserId(user.id);
        setUsername(user.name);
        setMail(user.email);
        setIslogin(true);
        console.log('User authorized ✅:', user);
      } catch (err) {
        console.error('Authorization failed ❌:', err);
        setIslogin(false);
      }
    };

    fetchProfile(); // run on mount
  }, []); // empty dependency = only on reload/mount

  return null; // no UI, this just loads on page reload
};

export default ProfileLoader;
