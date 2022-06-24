import { css } from "@emotion/react";

interface ImageSelectProps {
  selected: boolean;
  onClick: () => void;
  image_url: string;
}

export default function ImageSelect({ selected, onClick, image_url }: ImageSelectProps) {
  return (
    <button
      css={css`
        display: flex;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        width: 600px;
        height: 300px;
        cursor: pointer;
        padding: 0;
      `}
      onClick={onClick}
    >
      {selected && (
        <div
          css={css`
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            z-index: 5;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <img
            src="/heart.png"
            layout="fixed"
            css={css`
              width: 80px;
              height: 80px;
            `}
          />
        </div>
      )}
      <img
        src={image_url}
        css={css`
          width: 100%;
          height: 100%;
        `}
      />
    </button>
  );
}
