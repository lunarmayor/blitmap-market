import logo from "../../public/ape.jpeg";
import Image from "next/image";

const Logo = props => <Image alt="logo" src={logo} {...props} />;

export default Logo;
