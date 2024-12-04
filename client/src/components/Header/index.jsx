import { Link } from 'react-router-dom';
import logo from '../../assets/receipt-printer-for-logo.jpeg';

const Header = () => {
    return (
        <header>
            <div className="header-box">
                <div className="header-box-inside">
                    <img src={logo} alt="Application Logo" className="application-image"/>
                    <p className="application-title">Receipts on Repeat</p>
                    <nav className="nav-bar">
                        <Link to="/UserProfile" className="nav-bar-link">User Profile</Link>
                        <Link to="/PlaylistReceipt" className="nav-bar-link">Current Playlist</Link>
                        <Link to="/SavedPlaylists" className="nav-bar-link">Saved Playlists</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;