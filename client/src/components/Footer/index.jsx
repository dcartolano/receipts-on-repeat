// import { Link } from 'react-router-dom';
// import logo from '../../assets/receipt-printer-for-logo.jpeg';
import spotifyLogo from '../../assets/Spotify_Full_Logo_RGB_Green.png';
import lyricsOvhLogo from '../../assets/lyrics-ovh-logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer-box">
                <div className="footer-box-inside">
                    <p className="text-left">Powered by <a href="https://open.spotify.com" target="_blank" ><img src={spotifyLogo} alt="" className="external-api-logo"/></a></p>
                    <p className="text-right">Lyrics data courtesy of <a href="https://lyrics.ovh" target="_blank" ><img src={lyricsOvhLogo} alt="" className="external-api-logo"/></a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;