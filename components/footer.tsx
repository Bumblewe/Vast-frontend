import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
   <div>
    <section className="contact-area" id="contact">
        <div>
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="contact-content text-center">
                        <div className="flex justify-center "><img src="/logo-white.png" alt="logo" width={250} height={70} /></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        <div className="hr"></div>
                        <h6>1120 Lorem ipsum dolor sit amet, KC 179050, Chandigarh.</h6>
                        <h6>+01 2345 6789 12<span>|</span>+01 2345 6789 12</h6>
                        <div className="contact-social">
                            <ul>
                                <li><a className="hover-target insta" href=""><InstagramIcon /></a></li>
                                <li><a className="hover-target fb" href=""><FacebookIcon /></a></li>
                                <li><a className="hover-target fb" href=""><MailIcon /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <p>Copyright &copy; 2024 Vast Wragger</p>
    </footer>
   </div>
  )
};

export default Footer;
