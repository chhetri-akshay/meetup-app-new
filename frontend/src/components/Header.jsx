import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav className="navbar bg-body-secondary">
                <div className="container py-1">
                    <Link to={"/"} className='navbar-brand'>
                    <img src={"/meetupLogo.png"} alt="logo" style={{height: '80px', width: '90px'}}/>
                    </Link>
                    
                </div>
                <hr/>
            </nav>   
        </header>
        
    )
}

export default Header;