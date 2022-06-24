import { css } from "@emotion/react";

interface EmotionSelectProps {
  selected: boolean;
  onClick: () => void;
  image_url: string;
  description: string;
}

export default function EmotionSelect({
  selected,
  onClick,
  image_url,
  description,
}: EmotionSelectProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
      `}
    >
      <button
        css={css`
          display: flex;
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          width: 300px;
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
      <span
        css={css`
          font-size: 24px;
        `}
      >
        {description}
      </span>
    </div>
  );
}
