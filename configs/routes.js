import Home from '../components/Home';
import About from '../components/About';
import VR from '../components/VR';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: Home
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: About
    },
    vr: {
        path: '/vr',
        method: 'get',
        page: 'vr',
        title: 'VR',
        handler: VR
    }
};
