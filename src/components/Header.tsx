import { css } from "@emotion/css";

const styleHeader = css`
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EE802F;
`;

const styleLogoText = css`
  color: #FFF;
  font-size: 16px;
`;

const AppHeader = () => {
  return (
    <header className={styleHeader}>
      <span className={styleLogoText}>Feed Finder</span>
    </header>
  );
};

export { AppHeader };
