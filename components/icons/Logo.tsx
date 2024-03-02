import Image from "next/image";

const Logo = ({ height = 32, width = 32 }) => (
  <Image
    priority={true}
    alt="SnapPwd Logo"
    src="/logo.svg"
    width={width}
    height={height}
  />
);

export default Logo;
