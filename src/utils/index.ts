import {Comment} from '../types';

export const sortCommentsByHierarchy = (comments: Comment[]): Comment[] => {
  return [...comments].sort((a, b) => {
    const pathA = (a.path ?? '').split(',').join('/');
    const pathB = (b.path ?? '').split(',').join('/');
    return pathA.localeCompare(pathB);
  });
};
