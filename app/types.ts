import { ChangeEvent } from "react";

export type Block = {
  value: string;
  id: string;
  output: null | string;
};

export interface BlockProps {
  block: Block;
  handleInputChange: (
    blockId: string,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleRunBlock: (blockId: string, inputValue: string) => void;
}
