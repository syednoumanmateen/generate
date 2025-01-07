import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Theme from './Theme'

interface quoteData {
    body: string;
    author: string;
}

const RandomQuote: FC = () => {
    const [quote, setQuote] = useState<quoteData>({
        body: "",
        author: ""
    })
    const [loading, setLoading] = useState(false)

    const generateRandomQuote = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://favqs.com/api/qotd');
            setQuote(response.data.quote);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching quote:', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        generateRandomQuote()
    }, [])

    return (
        <Theme title='Random Quote' style={{ "width": "50vw" }}>
            {loading && <div>Loading....</div>}
            <div className="mb-3">
                {!loading && quote && <div className='p-4 fs-4'>
                    <div>
                        "{quote.body}"
                    </div>
                    <div className='float-end fs-5'>-{quote.author}</div>
                </div>}
            </div>
            <button className='btn btn-primary rounded-pill' onClick={generateRandomQuote}>New Quote</button>
        </Theme>
    )
}

export default RandomQuote
