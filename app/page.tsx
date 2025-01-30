"use client";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import makeIdGenerator from "./idGen";
import { FaPlay } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { isHTML } from "./utils/isHTML";
import { BlockProps } from "./types";

const { generateId, getIds } = makeIdGenerator();

const createBlock = (value: string = ""): Block => ({
  value,
  id: generateId(),
  output: null,
});

const Block = ({ block, handleInputChange, handleRunBlock }: BlockProps) => {
  return (
    <div className="flex-col" key={block.id}>
      <label className="text-md font-mono">{block.id}</label>
      <div className="flex">
        <div className="flex-col grow">
          <textarea
            placeholder="textarea"
            value={block.value}
            className="border-4 rounded-lg border-solid w-full font-mono p-2"
            onChange={(event) => handleInputChange(block.id, event)}
          />
          {block.output ? (
            <p className="bg-gray-200 mt-2 p-2 whitespace-pre">
              {block.output}
            </p>
          ) : null}
        </div>
        <button
          onClick={() => handleRunBlock(block.id, block.value)}
          className="ml-4 bg-gray-400 px-4 py-2 hover:bg-gray-500 rounded text-white self-start flex items-center"
        >
          <FaPlay />
          <span className="ml-2">Run</span>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleAddNewBlock = () => {
    setBlocks((previousBlocks) => [...previousBlocks, createBlock()]);
  };

  const handleRunBlock = (blockId: string, inputValue: string) => {
    let outputValue;

    try {
      const ids = getIds();
      const blockMap = Object.fromEntries(blocks.map((b) => [b.id, b.output]));

      const context = ids
        .filter((id) => id !== blockId)
        .map((id) => `const ${id} = "${blockMap[id]}";`)
        .join("");

      outputValue = eval(context + inputValue);
      if (typeof outputValue === "object") {
        outputValue = JSON.stringify(outputValue, null, 2);
      }
    } catch (error) {
      outputValue = String(error);
    }

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId && block.output !== outputValue
          ? { ...block, output: outputValue }
          : block
      )
    );
  };

  const handleInputChange = (
    blockId: string,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;

    setBlocks((previousBlocks) =>
      previousBlocks.map((block) =>
        block.id === blockId ? { ...block, value: inputValue } : block
      )
    );
  };

  return (
    <div className="max-w-md my-12 mx-auto flex gap-4 flex-col">
      {blocks.map((block) => (
        <Block
          block={block}
          handleInputChange={handleInputChange}
          handleRunBlock={handleRunBlock}
        />
      ))}
      <button
        onClick={handleAddNewBlock}
        className="bg-gray-400 px-4 py-2 hover:bg-gray-500 rounded text-white self-start flex items-center"
      >
        <LuPlus />
        <span className="ml-2">Add new block</span>
      </button>
    </div>
  );
}
