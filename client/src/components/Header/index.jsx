import { Link } from 'react-router-dom';
import logo from '../../assets/receipt-printer-for-logo.jpeg';

const Header = () => {
    return (
        <header>
            <div className="header-box">
                <div className="header-box-inside">
                    <img src={logo} alt="Application Logo" className="application-image"/>
                    {/* <p className="application-title">Receipts on Repeat</p> */}
                    <Link to="/" className="application-title">Receipts on Repeat</Link>
                    <nav className="nav-bar">
                        <Link to="/login" className="nav-bar-link">Login</Link>
                        <Link to="/userProfile" className="nav-bar-link">User Profile</Link>
                        <Link to="/playlistReceipt" className="nav-bar-link">Current Playlist</Link>
                        <Link to="/savedPlaylists" className="nav-bar-link">Saved Playlists</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;