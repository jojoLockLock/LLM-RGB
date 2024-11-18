import { describe, it, expect } from 'vitest';
import { extractCodeBlock } from '../utils/extractCode';

describe('extractCodeBlock', () => {
  it('should extract code block from text', () => {
    const text = 'Here is some code:\n```js\nconsole.log("Hello, world!");\n```';
    const result = extractCodeBlock(text);
    expect(result).toBe('console.log("Hello, world!");');
  });

  it('should return the original text if no code block is present', () => {
    const text = 'This is a text without a code block.';
    const result = extractCodeBlock(text);
    expect(result).toBe(text);
  });

  it('should extract the first code block if multiple are present', () => {
    const text = 'First block:\n```js\nconsole.log("First");\n```\nSecond block:\n```js\nconsole.log("Second");\n```';
    const result = extractCodeBlock(text);
    expect(result).toBe('console.log("First");');
  });

  it('should handle empty code blocks', () => {
    const text = 'Here is an empty code block:\n```\n```';
    const result = extractCodeBlock(text);
    expect(result).toBe('');
  });

  it('should trim whitespace from extracted code block', () => {
    const text = 'Code with whitespace:\n```js\n  console.log("Trim me!");  \n```';
    const result = extractCodeBlock(text);
    expect(result).toBe('console.log("Trim me!");');
  });

  it('should handle code blocks with no language specified', () => {
    const text = 'No language specified:\n```\nconsole.log("No language");\n```';
    const result = extractCodeBlock(text);
    expect(result).toBe('console.log("No language");');
  });

  it('should return the original text if the code block is malformed', () => {
    const text = 'Malformed code block:\n```js\nconsole.log("Missing end");';
    const result = extractCodeBlock(text);
    expect(result).toBe(text);
  });
});
