import { Information24 } from "@carbon/icons-react";
import { FC, PropsWithChildren } from "react";

type DocReferrerProps = {
  topic?: string;
};

function topicToId(topic: string) {
  return `#_${topic.replace(/ |-/g, "_").toLocaleLowerCase()}`;
}

export const DocReferrer: FC<PropsWithChildren<DocReferrerProps>> = ({ topic, children }) => {
  const refId = topic ? topicToId(topic) : "";
  return <a href={`${process.env.PUBLIC_URL}/docs/anleitung.html${refId}`}
    target="_blank">
    <span> <Information24 /> </span>
    {children}
  </a>;
};
