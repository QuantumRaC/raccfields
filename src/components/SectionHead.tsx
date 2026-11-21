import Scramble from "./Scramble";

const RULE = "─".repeat(240);

export default function SectionHead({
  index,
  title,
  lede,
}: {
  index: string;
  title: string;
  lede?: React.ReactNode;
}) {
  return (
    <div className="sec-head" data-reveal>
      <span className="sec-index">{`// ${index}`}</span>
      <Scramble as="h2" className="sec-title" text={title} />
      <div className="sec-rule" aria-hidden>
        {RULE}
      </div>
      {lede ? <p className="sec-lede">{lede}</p> : null}
    </div>
  );
}
