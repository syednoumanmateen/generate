import { FC, useState } from "react"
import Theme from "./Theme"
import { useForm } from "react-hook-form"
import axios from "axios"

const ImageGenerate: FC = () => {
    const { register, handleSubmit } = useForm()
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const generateRandomQuote = async (e: any) => {
        try {
            setLoading(true)
            const response = await axios.post('https://api.openai.com/v1/images/generations', {
                prompt: e.description,
                n: e.count || 1,
                size: '1024x1024',
            }, {
                headers: {
                    'Authorization': `Bearer Auth_key`,
                },
            });

            setImage(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching quote:', error);
            setLoading(false)
        }
    }

    return (
        <Theme title="Image Generate" style={{ "width": "60vw" }}>
            <form className="mb-3" onSubmit={handleSubmit(generateRandomQuote)}>
                <div className="input-group mb-3">
                    <textarea className="form-control" cols={10} rows={3} {...register("description")} placeholder="Description"></textarea>
                </div>
                <div className="input-group mb-3">
                    <input type="number" className="form-control" {...register("count")} placeholder="No Of images" />
                </div>
                <input className="btn btn-primary" type="submit" />
            </form >
            <div className="container">
                <div className="gallery mb-4">
                    {!loading && image && image.length && (<>
                        {image.map((imag: any) => (
                            <div key={imag.id} className="item mb-3">
                                <img src={imag.url} alt={imag.alt} className="rounded w-100" />
                            </div>
                        ))}
                    </>)}
                </div>
            </div>
        </Theme>
    )
}

export default ImageGenerate
