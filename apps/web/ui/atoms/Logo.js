import logo from "../../public/blitmap-logo.png";
import Image from "next/image";

const Logo = props => <Image alt="logo" src={logo} {...props} />;

export default Logo;
