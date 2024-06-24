import { useState } from "react";
import Field from "@/components/Field";
import axios from "axios";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://aicool-server.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("User login successfully:", response.data);
      const userData = response.data.user;

      localStorage.setItem("aiUserData", JSON.stringify(userData));
      router.push("/");
    } catch (error) {
      console.error("Error login user:", error);
      alert(error?.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Email"
        icon="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />

      <button className="btn-blue btn-large w-full" type="submit">
        Sign in with Ai Cool
      </button>
    </form>
  );
};

export default SignIn;
