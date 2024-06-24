import { useState } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Code from "@/components/Code";

import { writeCodeChat } from "@/mocks/writeCodeChat";
import axios from "axios";
import toast from "react-hot-toast";
const YOU = "you";
const AI = "ai";
const CodeGenerationPage = () => {
  const [message, setMessage] = useState<string>("");
  const [qna, setQna] = useState([
    // { from: YOU, value: "From me" },
    // { from: AI, value: "From AI" },
  ]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from: any, value: any) => {
    setQna((qna) => [...qna, { from, value }]);
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
      return value.map((v) => (
        <p key={v.id} className="message-text">
          {v}
        </p>
      ));
    }

    return <p className="message-text">{value}</p>;
  };

  return (
    <Layout>
      <Chat title="Write Your Code With Me">
        {qna.map((qna, index) => {
          if (qna.from === YOU) {
            return (
              <div
                key={index}
                className="flex items-center border  rounded-lg p-2"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  className="rounded-full h-10 w-10 mr-2"
                />
                <p>{renderContent(qna)}</p>
              </div>
            );
          }
          return (
            <Answer key={index} time="Just now">
              <p>{renderContent(qna)}</p>
            </Answer>
          );
        })}

        {loading && <Answer loading />}
      </Chat>
      <Message
        value={message}
        handleSend={handleSend}
        onChange={(e: any) => setMessage(e.target.value)}
      />
    </Layout>
  );
};

export default CodeGenerationPage;
