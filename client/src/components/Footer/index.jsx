import { Link } from 'react-router-dom';
import logo from '../../assets/receipt-printer-for-logo.jpeg';
import spotifyLogo from '../../assets/Spotify_Full_Logo_RGB_Green.png';

const Footer = () => {
    return (
        <footer>
            <div className="header-box">
                <div className="header-box-inside">
                    <img src={logo} alt="Application Logo" className="application-image"/>
                    <p className="application-title">Receipts on Repeat</p>
                    <p className="external-api-logo">Music content provided by <a href="https://open.spotify.com" target="_blank" ><img src={spotifyLogo} alt="" className="external-api-logo"/></a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;