import React, { useCallback, useEffect, useState } from 'react';
import {
  backgroundColor,
  classnames,
  effects,
  interactivity,
  layout,
  position,
  sizing,
} from 'tailwindcss-classnames';

const resizeHandle = (avtive: boolean) =>
  classnames(
    sizing('w-0.5'),
    position('absolute'),
    layout('top-0', 'bottom-0'),
    backgroundColor('bg-gray-100'),
    interactivity('cursor-col-resize'),
    effects('opacity-0', 'hover:opacity-100')
  );

interface ColumnProps extends React.DOMAttributes<HTMLTableCellElement> {}

const Column: React.FC<ColumnProps> = ({ children, ...rest }) => {
  const [active, setActive] = useState(false);
  console.log('ref: ', rest);
  useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  const onMouseDown = () => {
    setActive(true);
    console.log('Start resizing...');
  };

  const mouseMove = useCallback((e: MouseEvent) => {}, []);

  const mouseUp = useCallback(() => {
    setActive(false);
    console.log('Stop resizing...');
  }, [active]);

  return (
    <th className='text-left' {...rest}>
      <span>{children}</span>
      <div onMouseDown={onMouseDown} className={resizeHandle(active)} />
    </th>
  );
};

export default Column;
