import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Channels from './pages/Channels';
import Afterlife from './pages/Afterlife';
import Lab from './pages/Lab';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'channels', element: <Channels /> },
      { path: 'afterlife', element: <Afterlife /> },
      { path: 'lab', element: <Lab /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
