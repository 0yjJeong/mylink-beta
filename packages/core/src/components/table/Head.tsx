import React, { useState } from 'react';
// import { Resizable, ResizableProps } from 'react-resizable';

interface HeadProps {
  name: string;
  index?: number;
  mouseDown?: (index: number) => void;
  classes?: string;
  children?: React.ReactNode;
}

const Head = React.forwardRef<HTMLTableCellElement, HeadProps>((props, ref) => {
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  // const onResize = (event, { element, size, handle }) => {
  //   setWidth(size.width);
  //   setHeight(size.height);
  // };

  return (
    <th
      ref={ref}
      /**
       * !!IMPORTANT!!
       * table th, should have a select-none prop to prevent dragging
       * table cell className='... select-none'
       */
      className={`min-w-[150px] relative select-none text-left ${props.classes}`}
      // onClick={() => setActive(!active)}
    >
      <span className=''>{props.children}</span>
      <div
        onMouseDown={() => props.mouseDown(props.index)}
        className='opacity-100 h-[100vh] cursor-col-resize bg-gray-100 hover:bg-cyan-500 hover:shadow w-0.5 absolute top-0 bottom-0 right-0'
      />
    </th>
  );
});

export default Head;
