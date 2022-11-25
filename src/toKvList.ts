import { isEnumMember } from 'typescript';
import type { SourceFile, EnumDeclaration } from 'typescript';

import { firstChar2lowerCase, getComment, getCommentContent } from './utils';

export function toKvList(node: EnumDeclaration, sourceFile: SourceFile) {
  const firstToken = node.getFirstToken(sourceFile)?.getFullText(sourceFile);
  const comment = getComment(node, sourceFile);

  let outputCode = `${comment ? `${comment}\n` : ''}${
    firstToken?.endsWith('export') ? 'export ' : ''
  }const ${firstChar2lowerCase(node.name.text)}List: {key: ${node.name.text}, value: string}[] = [`;

  const members: string[] = [];
  node.forEachChild((n) => {
    const content = getCommentContent(n, sourceFile);
    if (isEnumMember(n)) {
      const propertyName = n.name.getText(sourceFile);
      members.push(
        `{key: ${node.name.text}.${propertyName}, value: '${content || propertyName}}',`
      );
    }
  });
  outputCode += `\n${members.join('\n')}\n]`;

  return outputCode;
}
