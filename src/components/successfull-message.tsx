interface MessageProps {
  headline: string;
  text: string;
}

const SuccessfulMessage = ({ headline, text }: MessageProps) => {
  return (
    <article className="successful-message bg-emerald-500">
      <h3 className="">{headline}</h3>
      <p className="font-medium">{text}</p>
    </article>
  );
};

export default SuccessfulMessage;
