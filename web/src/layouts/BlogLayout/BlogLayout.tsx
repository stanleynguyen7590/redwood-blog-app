import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const BlogLayout: React.FunctionComponent = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>Redwood Blog</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
            <li>
              <button onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
              {isAuthenticated && <li>{currentUser.email}</li>}
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
