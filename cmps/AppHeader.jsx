const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
           {/* <img src="./assets/img/appsus.png" /> */}
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail?status=inbox">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
