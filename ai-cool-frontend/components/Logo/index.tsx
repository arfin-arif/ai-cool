import Link from "next/link";
import Image from "@/components/Image";

type TestProps = {
  className?: string;
  dark?: boolean;
};

const Test = ({ className, dark }: TestProps) => (
  <Link className={`flex w-[11.88rem] ${className}`} href="/">
    {/* <Image
      className="w-80 h-30"
      src={dark ? "/images/logo.png" : "/images/logo.png"}
      width={150}
      height={10}
      alt="Ai Cool"
    /> */}
  </Link>
);

export default Test;
