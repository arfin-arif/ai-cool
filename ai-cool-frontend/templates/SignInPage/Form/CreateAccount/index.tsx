import { useState } from "react";
import Link from "next/link";
import Field from "@/components/Field";
import axios from "axios";
import { useRouter } from "next/router";

type CreateAccountProps = {};

const CreateAccount = ({}: CreateAccountProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://aicool-server.vercel.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("User registered successfully:", response.data);
      const userData = response.data.user;
      localStorage.setItem("aiUserData", JSON.stringify(userData));
      router.push("/");
    } catch (error) {
      alert(error?.response?.data?.error);
      console.error("Error registering user:", error);
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Name"
        icon="profile"
        type="text"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        required
      />
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Email"
        icon="email"
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-6"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button className="btn-blue btn-large w-full mb-6" type="submit">
        Create Account
      </button>
      <div className="text-center caption1 text-n-4">
        By creating an account, you agree to our{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="/"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="/"
        >
          Privacy & Cookie Statement
        </Link>
        .
      </div>
    </form>
  );
};

export default CreateAccount;
