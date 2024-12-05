import spotifyLogo from '../../assets/Spotify_Full_Logo_RGB_Green.png';
import lyricsOvhLogo from '../../assets/lyrics-ovh-logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer-box">
                <div className="footer-box-inside">
                    <div className='footer-logo'>
                        <p className="text-left spotify-box">Powered by <a href="https://open.spotify.com" target="_blank" ><img src={spotifyLogo} alt="" className="external-api-logo lyrics-logo" /></a></p>
                        <p className="text-right lyrics-box">Lyrics data courtesy of <a href="https://lyrics.ovh" target="_blank" ><img src={lyricsOvhLogo} alt="" className="external-api-logo spotify-logo" /></a></p>
                    </div>
                    <div className='footer-creators-text'>
                        <p className='creators-text'>
                            Created by <a href="https://github.com/dcartolano" target="_blank" className='creator-text-link'>David Cartolano</a>&nbsp;
                        </p>
                        <p className='creators-text'>
                            and <a href="https://github.com/5mitty" target="_blank" className='creator-text-link'>Jacob Smith</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;