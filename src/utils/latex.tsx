import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export function processLatex(text: string): React.ReactNode[] {
  const latexRegex = /\$(.*?)\$/g;
  const parts = text.split(latexRegex);
  
  return parts.map((part, index) => {
    // Even indices are regular text, odd indices are LaTeX
    if (index % 2 === 0) {
      return part;
    } else {
      return <InlineMath key={index} math={part} />;
    }
  });
}