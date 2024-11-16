import { CSSProperties, FC } from 'react';

interface IMarkdown {
  input: string;
  style: CSSProperties | undefined;
}

function renderMarkdownWithLinks(
  input: string,
  style: CSSProperties | undefined
): (string | JSX.Element | null)[] {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = input.split(regex);
  return parts.map((part: string, index: number) => {
    if (index % 3 === 0) {
      return part;
    } else if (index % 3 === 1) {
      return (
        <a
          key={index}
          href={parts[index + 1]}
          style={style}
          className="underline-offset-2"
        >
          {part}
        </a>
      );
    } else {
      return null;
    }
  });
}

const MarkDown: FC<IMarkdown> = ({ input, style }) => {
  return <>{renderMarkdownWithLinks(input, style)}</>;
};

export default MarkDown;
