import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Theme from './Theme'

const RandomJokes: FC = () => {
    const [jokes, setJokes] = useState("")
    const [loading, setLoading] = useState(false)

    const generateRandomJokes = async () => {
        try {
            setLoading(true)
            const res: any = await axios.get('https://v2.jokeapi.dev/joke/Any');
            if (res.data.type === "single") {
                setJokes(res.data.joke);
            } else {
                setJokes(`${res.data.setup}-${res.data.delivery}`)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching jokes:', error);
        }
    }

    useEffect(() => {
        generateRandomJokes()
    }, [])

    return (
        <Theme title='Random Jokes' style={{ "width": "50vw" }}>
            {loading && <div>Loading....</div>}
            <div className="mb-3">
                {!loading && jokes && <div className='p-4 fs-4'>
                    "{jokes}"
                </div>}
            </div>
            <button className='btn btn-primary rounded-pill' onClick={generateRandomJokes}>New Jokes</button>
        </Theme>
    )
}

export default RandomJokes
