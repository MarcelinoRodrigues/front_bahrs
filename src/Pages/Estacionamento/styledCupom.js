// styledCupom.js

import styled from 'styled-components';

export const CupomContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; 

  width: 300px; 
  padding: 20px;
  border: 1px solid #000;
  background-color: #fff; 
  font-family: Arial, sans-serif;

  h2 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 0.5em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5em;
  }

  button {
    margin-top: 1em;
    margin-left: 1em;
    padding: 0.6em 1em;
    background-color: #5bc0de;
    cursor: pointer;
  }
  .Cancel{ background-color: #FF6347!important;}

  @media print {
    & {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    h2 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
   }

   p {
      margin-bottom: 0.5em;
   }

   ul {
      list-style-type: none;
      padding: 0;
   }
  }
`;
