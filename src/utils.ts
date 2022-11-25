/**
 * copy from lichen： https://github.com/frontlich/enum2map
 *
 */

import { getLeadingCommentRanges } from 'typescript';
import type { Node, SourceFile } from 'typescript';

/** 首字母转小写 */
export function firstChar2lowerCase(str: string) {
  const first = str.charAt(0).toLowerCase();
  return `${first}${str.slice(1)}`;
}

/** 获取注释 */
export function getComment(node: Node, sourceFile: SourceFile) {
  const fullText = sourceFile.getFullText();
  const commentRanges = getLeadingCommentRanges(fullText, node.getFullStart());
  if (commentRanges?.length) {
    const commentStrings = commentRanges.map((r) => fullText.slice(r.pos, r.end));
    return commentStrings[commentStrings.length - 1];
  }
  return '';
}

/** 获取注释内容 */
export function getCommentContent(node: Node, sourceFile: SourceFile) {
  const comment = getComment(node, sourceFile);
  return comment.replace(/[\/\*\s]/g, '').trim();
}

export enum Test {
  first,
  second,
  third,
}

export const testList: { key: Test; value: string }[] = [{ key: Test.first, value: '111' }];
