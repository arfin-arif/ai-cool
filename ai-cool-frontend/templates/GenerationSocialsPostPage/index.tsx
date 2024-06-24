import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Answer from "@/components/Answer";
import axios from "axios";
import { toast } from "react-hot-toast";

const YOU = "you";
const AI = "ai";

const GenerationSocialsPostPage = () => {
  const [message, setMessage] = useState<string>("");
  const [qna, setQna] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from: string, value: string) => {
    setQna((prevQna) => [...prevQna, { from, value }]);
  };

  const handleSend = () => {
    const question = message;
    updateQNA(YOU, question);
    setMessage("");

    setLoading(true);

    axios
      .post("https://aicool-server.vercel.app/chat", { question })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = (qna: any) => {
    const value = qna.value;
    if (Array.isArray(value)) {
      return value.map((v, index) => (
        <p key={index} className="message-text">
          {v}
        </p>
      ));
    }
    return <p className="message-text">{value}</p>;
  };

  return (
    <Layout>
      <Chat title="Social">
        {qna.map((qna, index) => (
          <div key={index} className="flex items-center border rounded-lg p-2">
            <img
              src={
                qna.from === YOU
                  ? "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  : "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              }
              alt=""
              className="rounded-full h-10 w-10 mr-2"
            />
            <p>{renderContent(qna)}</p>
          </div>
        ))}
        {loading && <Answer loading />}
      </Chat>
      <Message
        handleSend={handleSend}
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
      />
    </Layout>
  );
};

export default GenerationSocialsPostPage;
