'use client'
import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


type Props = {
    code : string   
  }


const PythonCodeDisplay = ({code}:Props) => {

  return (
    <div className='md: w-[80%] mx-auto'>
      <h3 className='text-primary'></h3>
      <SyntaxHighlighter language="python" style={darcula} dir='ltr'>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default PythonCodeDisplay;