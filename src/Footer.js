import React from "react";
import "./Footer.css";
import grap_logo from './img/grap_logo2-1.png';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import {grey} from "@material-ui/core/colors";

function Footer () {

    return (
        <footer>
            <div>
                <TwitterIcon className="footer_icon" style={{ fontSize: 40, color: grey[50], marginRight: 30}}/>
                <GitHubIcon className="footer_icon" style={{ fontSize: 40, color: grey[50], marginRight: 30}}/>
                <FacebookIcon className="footer_icon" style={{ fontSize: 40, color: grey[50], marginRight: 30}}/>
                <EmailIcon className="footer_icon" style={{ fontSize: 40, color: grey[50]}}/>
            </div>
            <div>
                <span className="footer_copyright">Copyright© GRAP(주) All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;
