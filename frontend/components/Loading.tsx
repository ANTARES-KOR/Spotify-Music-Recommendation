import { css, jsx } from "@emotion/react";

const Loading = () => {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <h3
        css={css`
          font-size: 30px;
        `}
      >
        Loading...
      </h3>
      <img
        src="/loadingcat.gif"
        css={css`
          width: 400px;
        `}
        alt="loading img"
      />
    </div>
  );
};

export default Loading;
