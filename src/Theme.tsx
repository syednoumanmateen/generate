import { FC } from 'react'

interface ThemeProps {
    children: React.ReactNode;
    title: string;
    style?: any
}

const Theme: FC<ThemeProps> = ({ title, children, style = {} }) => {
    return (
        <div className="bg-dark d-flex justify-content-center align-items-center min-vh-100">
            <div className="card" style={style}>
                <h5 className="card-header">{title}</h5>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Theme
