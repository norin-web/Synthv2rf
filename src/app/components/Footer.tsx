import { Link } from "react-router";
import { app, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "./Btn";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__panel">
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="logo">
                <img src={img("/images/app-icon.png")} alt="" width={40} height={40} />
                <span>{site.brand}</span>
              </Link>
              <p className="muted">{site.tagline}.</p>
              <a className="footer__mail" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="footer__cols">
              <div>
                <span className="footer__h">Navigate</span>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/app">App</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </div>
              <div>
                <span className="footer__h">Help</span>
                <ul>
                  <li><Link to="/support">Support</Link></li>
                  <li><Link to="/feedback">Feedback</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms of Use</Link></li>
                </ul>
              </div>
              <div className="footer__get">
                <span className="footer__h">Get the app</span>
                <Btn href={app.url} size="sm">App Store</Btn>
              </div>
            </div>
          </div>
          <div className="footer__copy">
            <p>
              © {site.year} {site.operator}. {site.disclaimer}
            </p>
            <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
          </div>
        </div>
      </div>
      <div className="footer__word" aria-hidden="true">SYNTX</div>
    </footer>
  );
}
