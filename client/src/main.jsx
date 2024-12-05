import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import EntryPage from './pages/EntryPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/Error';
import PlaylistReceipt from './pages/PlaylistReceipt';
import UserProfile from './pages/UserProfile';
import SavedPlaylistReceipts from './pages/SavedReceipts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <EntryPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/playlistReceipt',
                element: <PlaylistReceipt />,
            },
            {
                path: '/userProfile',
                element: <UserProfile />,
            },
            {
                path: '/savedPlaylists',
                element: <SavedPlaylistReceipts />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);