import { parse } from 'url';

export function isSameSource(source: string, target: string): boolean {
  const parsedSource = parse(source);
  const parsedTarget = parse(target);

  return (
    parsedSource.protocol === parsedTarget.protocol &&
    parsedSource.host === parsedTarget.host
  );
}
