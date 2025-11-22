// src/lib/question-helpers.ts

import type { PowerType, FractionAnswerType } from './types';
import FRACTION_DATA from './fractions.json';

export interface Question {
  question: string;
  answer: string | number;
  hint?: string;
  answerType?: FractionAnswerType;
  unroundedAnswer?: number;
}

const buildPercentageString = (numerator: number, denominator: number): string => {
  const percentageValue = (numerator / denominator) * 100;
  let percentageString = '';

  const wholePart = Math.floor(percentageValue);
  const remainder = percentageValue - wholePart;

  if (remainder > 0.001) {
    const fractions: { [key: number]: { n: number; d: number } } = {
      0.5: { n: 1, d: 2 },
      0.333: { n: 1, d: 3 },
      0.666: { n: 2, d: 3 },
      0.25: { n: 1, d: 4 },
      0.75: { n: 3, d: 4 },
      0.2: { n: 1, d: 5 },
      0.4: { n: 2, d: 5 },
      0.6: { n: 3, d: 5 },
      0.8: { n: 4, d: 5 },
      0.166: { n: 1, d: 6 },
      0.833: { n: 5, d: 6 },
      0.142: { n: 1, d: 7 },
      0.125: { n: 1, d: 8 },
      0.375: { n: 3, d: 8 },
      0.625: { n: 5, d: 8 },
      0.875: { n: 7, d: 8 },
      0.111: { n: 1, d: 9 },
    };
    let found = false;
    for (const key in fractions) {
      if (Math.abs(remainder - parseFloat(key)) < 0.001) {
        const frac = fractions[key];
        // Convert to basic string representation for mobile if not using MathML renderer
        // OR use a webview for MathML.
        // The blueprint says "Generative Drawing" which is irrelevant.
        // The "Math Tools" app uses MathML strings in the question prop.
        // I will stick to the string for now, but I might need to render HTML/MathML.
        // In RN, simple Text doesn't support MathML.
        // I'll assume I can use a WebView or a simple parser.
        // For "100% same", I should try to render it visually similar.
        // But for logic porting, I keep the string construction.
        
        // Mobile Adaptation:
        // React Native Text doesn't render MathML tags.
        // I will keep the logic as is, but when rendering the question in the screen component,
        // I will need to handle this.
        // The current string: <math><mrow>...</mrow></math>
        
        percentageString = `<math><mrow>${
          wholePart > 0 ? `<mn>${wholePart}</mn>` : ''
        }<mfrac><mn>${frac.n}</mn><mn>${frac.d}</mn></mfrac><mo>%</mo></mrow></math>`;
        found = true;
        break;
      }
    }
    if (!found) {
      percentageString = `<math><mrow><mn>${percentageValue
        .toFixed(2)
        .replace(/\.00$/, '')}</mn><mo>%</mo></mrow></math>`;
    }
  } else {
    percentageString = `<math><mrow><mn>${wholePart}</mn><mo>%</mo></mrow></math>`;
  }
  return percentageString;
};

export const generateTablesQuestion = (config: {
  selected: number[];
}): Question => {
  const { selected } = config;
  const table = selected[Math.floor(Math.random() * selected.length)];
  const multiplier = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${table} × ${multiplier}`, // Changed &times; to × for better native text support
    answer: table * multiplier,
  };
};

export const generatePracticeQuestion = (config: {
  digits1: number[];
  digits2: number[];
}): Question => {
  const { digits1, digits2 } = config;
  const d1 = digits1[Math.floor(Math.random() * digits1.length)];
  const d2 = digits2[Math.floor(Math.random() * digits2.length)];
  const generateRandomNumber = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const num1 = generateRandomNumber(d1);
  const num2 = generateRandomNumber(d2);
  return {
    question: `${num1} × ${num2}`, // Changed &times; to ×
    answer: num1 * num2,
  };
};

export const generatePowersQuestion = (config: {
  selected: PowerType[];
  rangeMax: number;
}): Question | null => {
  const { selected, rangeMax } = config;
  const powerMode = selected[Math.floor(Math.random() * selected.length)];
  const minRange = 2;
  let maxNum = rangeMax;

  if (powerMode === 'cubes' || powerMode === 'cube_roots') {
    maxNum = Math.min(rangeMax, 20);
  }

  if (minRange > maxNum) return null;

  const n = Math.floor(Math.random() * (maxNum - minRange + 1)) + minRange;
  let question = '';
  let answer = 0;

  switch (powerMode) {
    case 'squares':
      // Using standard unicode superscripts for React Native Text compatibility if possible, or I'll need a special renderer
      question = `${n}²`; // Replaced <sup>2</sup>
      answer = n * n;
      break;
    case 'cubes':
      question = `${n}³`; // Replaced <sup>3</sup>
      answer = n * n * n;
      break;
    case 'square_roots':
      question = `√${(n * n).toLocaleString()}`; // Replaced &radic;
      answer = n;
      break;
    case 'cube_roots':
      question = `∛${(n * n * n).toLocaleString()}`; // Replaced <sup>3</sup>&radic; -> ∛
      answer = n;
      break;
  }
  return { question, answer };
};

export const generateFractionsQuestion = (config: {
  selected: FractionAnswerType[];
}): Question => {
  const { selected } = config;
  const answerType = selected[Math.floor(Math.random() * selected.length)];
  const randomFractionData =
    FRACTION_DATA[Math.floor(Math.random() * FRACTION_DATA.length)];
  const { n, d } = randomFractionData;

  const percentageValue = (n / d) * 100;

  if (answerType === 'fraction') {
    // Original: buildPercentageString(n, d) returns MathML
    // We should probably return something renderable in RN without heavy html parsing if possible.
    // However, keeping the structure for now. 
    // I will modify `buildPercentageString` to return a custom object or plain text if needed later, 
    // but for now I will assume the QuestionDisplay component will handle the MathML/HTML string
    // OR I should change it here to be RN friendly.
    // "100% same" visuals means I need rich text.
    // I will stick to the original string and handle it in the view.
    return {
      question: buildPercentageString(n, d),
      answer: `${n}/${d}`,
      hint: 'Answer as a fraction (e.g. 1/2)',
      answerType: 'fraction',
    };
  } else {
    // answerType is 'decimal'
    return {
      question: `<math><mfrac><mn>${n}</mn><mn>${d}</mn></mfrac></math>`,
      answer: percentageValue.toFixed(2),
      unroundedAnswer: percentageValue,
      hint: 'Answer as a percentage',
      answerType: 'decimal',
    };
  }
};
