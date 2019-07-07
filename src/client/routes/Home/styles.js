import styled, { injectGlobal } from 'react-emotion';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }

  video {
    width: 100%;
    margin: 8px 0;
  }

  button {
    background: #4257b8;
    color: white;
    font-size: 1.5rem;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: none;
    outline: none;
  }

  button:hover {
    filter: brightness(110%);
  }

  button:click {
    border: inset 1px black;
  }
`;
export const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  font-size: 24px;

  img {
    width: 32px;
  }
`;