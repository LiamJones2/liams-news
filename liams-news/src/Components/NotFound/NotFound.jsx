import { Link} from 'react-router-dom';

function NotFound() {
    return (
        <div className=''>
            <h1>That path does not exist</h1>
            <Link to="/"><button>Return to Home</button></Link>
        </div>
    )
}

export default NotFound