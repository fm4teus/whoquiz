import styled from 'styled-components';
import Image from 'next/image'
import React from 'react';

function Logo() {
  return (
    <Image
      src="/assets/default.png"
      alt="Picture of the author"
      width={150}
      height={150}
    />
  );
}



const QuizLogo = styled(Logo)`
  margin: auto;
  display: flex;
  width: 150px;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;