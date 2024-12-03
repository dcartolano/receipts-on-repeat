import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage'; // Ensure the path is correct
import ErrorPage from './pages/Error';
import PlaylistReceipt from './pages/PlaylistReceipt';
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                index: '/playlistReceipt',
                element: <PlaylistReceipt />,
            },
            {
                index: '/userProfile',
                element: <UserProfile />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);