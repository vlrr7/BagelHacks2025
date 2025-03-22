import { SITENAME } from "../globals";

const Header = () => {
  return (
    <div>
      <header>
        <h1>{SITENAME}</h1>
        <a href="/login.html">Login</a>
        <a className="accented" href="/signup.html">
          Sign Up
        </a>
      </header>
      <hr></hr>
    </div>
  );
};
export default Header;
