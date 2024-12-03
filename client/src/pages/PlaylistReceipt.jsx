import Receipt from "../components/Receipt/index.jsx";

const PlaylistReceipt = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <div>
            <Receipt />
        </div>
    )
}

export default PlaylistReceipt;