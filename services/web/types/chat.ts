export type Message = {
  id: string;
  sender: {
    username: string;
    image: string | null;
  };
  text: string;
};

export type ChatProps = {
  code: string;
};

export type ChatMessageProps = {
  message: Message;
};
