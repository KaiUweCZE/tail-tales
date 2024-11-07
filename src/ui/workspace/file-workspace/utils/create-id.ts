export const createId = () =>
  `el-${Date.now()}-${Math.random().toString(16).substring(2, 9)}`;
