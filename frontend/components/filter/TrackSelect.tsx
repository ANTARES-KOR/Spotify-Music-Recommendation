import Image from "next/image";
import { css } from "@emotion/react";

interface TrackSelectProps {
  selected: boolean;
  onClick: () => void;
  track_name: string;
  artist_name: string;
  album_image: string;
}

export default function TrackSelect({
  selected,
  onClick,
  track_name,
  artist_name,
  album_image,
}: TrackSelectProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
      `}
    >
      <button
        onClick={onClick}
        css={css`
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          padding: 0;
        `}
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
          src={album_image}
          css={css`
            width: 264px;
            height: 264px;
          `}
        />
      </button>
      <div
        css={css`
          display: flex;
          gap: 8px;
          flex-direction: column;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-weight: 600;
            font-size: 22px;
          `}
        >
          {track_name}
        </span>
        <span
          css={css`
            font-size: 16px;
            color: gray;
          `}
        >
          {artist_name}
        </span>
      </div>
    </div>
  );
}
