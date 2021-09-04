import * as React from 'react';
import { PageProps, Link, withPrefix } from 'gatsby';
import { useAuthState } from 'react-firebase-hooks/auth';

import { signInGoogle, auth } from '../utils/firebase';

type Props = {
  title: string;
} & Pick<PageProps, 'location'>;

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const isRootPath = location.pathname === withPrefix('/');
  let header: React.ReactNode;

  // React.useEffect(() => {
  //   getResult()
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // }, []);

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        <div className="g-sign-in-button" onClick={signInGoogle}>
          <div className="content-wrapper">
            <div className="logo-wrapper">
              <img src="https://developers.google.com/identity/images/g-logo.png" />
            </div>
            <span className="text-container">
              <span>Sign in with Google</span>
            </span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
