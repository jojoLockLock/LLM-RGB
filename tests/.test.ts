import { describe, it, expect } from 'vitest';
import { extractCodeBlock } from '../utils/extractCode';

describe('extractCodeBlock', () => {
  it('should extract a code block with specified language', () => {
    const text = `
      Here is some text.
      \`\`\`javascript
      console.log('Hello, world!');
      \`\`\`
      More text here.
    `;
    const result = extractCodeBlock(text);
    expect(result).toBe("console.log('Hello, world!');");
  });

  it('should extract a code block without specified language', () => {
    const text = `
      Here is some text.
      \`\`\`
      console.log('Hello, world!');
      \`\`\`
      More text here.
    `;
    const result = extractCodeBlock(text);
    expect(result).toBe("console.log('Hello, world!');");
  });

  it('should return the original text if no code block is found', () => {
    const text = 'Here is some text without a code block.';
    const result = extractCodeBlock(text);
    expect(result).toBe(text);
  });

  it('should handle an empty string', () => {
    const text = '';
    const result = extractCodeBlock(text);
    expect(result).toBe(text);
  });

  it('should extract the first code block if multiple are present', () => {
    const text = `
      Here is some text.
      \`\`\`javascript
      console.log('First block');
      \`\`\`
      Some more text.
      \`\`\`python
      print('Second block')
      \`\`\`
      End of text.
    `;
    const result = extractCodeBlock(text);
    expect(result).toBe("console.log('First block');");
  });
});
