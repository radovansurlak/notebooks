import { BlockProps } from "./types";

export const Block = ({
  block,
  handleInputChange,
  handleRunBlock,
}: BlockProps) => {
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
