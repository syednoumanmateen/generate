import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Theme from './Theme'

const RandomQuote: FC = () => {
    const [quote, setQuote] = useState("")
    const [loading, setLoading] = useState(false)

    const generateRandomQuote = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://favqs.com/api/qotd');
            setQuote(response.data.quote.body);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching quote:', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        generateRandomQuote()
    },[])

    return (
        <Theme title='Random Quote' style={{ "width": "50vw" }}>
            {loading && <div>Loading....</div>}
            {!loading && quote && <div className='p-4 fs-3'>
                "{quote}"
            </div>}
            <button className='btn btn-primary rounded-pill' onClick={generateRandomQuote}>New Quote</button>
        </Theme>
    )
}

export default RandomQuote
