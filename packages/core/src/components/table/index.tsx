import React, { useCallback, useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';
import { useTable } from '../../hooks/table/useTable';
import { Response } from '../../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useData } from '../../api';

import Head from './Head';

const MIN_CELL_WIDTH = 150;
const MAX_TABLE_HEIGHT = 600;

interface TableProps {
  rows?: Response[];
  children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ rows, children }) => {
  const resource = useData();
  const tableRef = useRef<HTMLTableElement>(null);
  const columns = useRef<React.MutableRefObject<HTMLElement>[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(null);
  const refs = useRef<React.MutableRefObject<HTMLElement>[]>([]);

  const { offset = 1, limit = 5 } = queryString.parse(location.search);

  const { data, isFetching } = useQuery(`resource/links`, () => {
    return resource.links();
  });

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    () => {
      removeListeners();
    };
  }, [activeIndex]);

  const removeListeners = () => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
  };

  const mouseDown = useCallback(
    (index: number) => {
      console.log(`${index}번째 헤더의 마우스가 클릭됐습니다`);
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
    console.log(`마우스 UP!`);
  }, [setActiveIndex, removeListeners]);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      console.log('refs: ', refs, ' activeIndex: ', activeIndex);
      const gridColumns = refs.current.map((col, i) => {
        if (i === activeIndex) {
          const width =
            e.clientX + tableRef.current.scrollLeft - col.current.offsetLeft;
          console.log(`${i}번째 활성화... ${width}`);
          console.log('e.clientX: ', e.clientX);
          console.log('col.current.offsetLeft: ', col.current.offsetLeft);
          // console.log('e.offsetX: ', e.offsetX);
          // console.log('e.pageX: ', e.pageX);
          // console.log('e.screenX: ', e.screenX);
          // console.log('e.movementX: ', e.movementX);
          // console.log(
          //   'tableRef.current.scrollLeft: ',
          //   tableRef.current.scrollLeft
          // );
          if (MIN_CELL_WIDTH <= width) {
            return `${width}px`;
          }
        }
        return `${col.current.offsetWidth}px`;
      });
      tableRef.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
    },
    [activeIndex, refs.current, tableRef.current]
  );

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const ref = useRef();
      refs.current[index] = ref;
      return React.cloneElement<any>(child, {
        ref,
        index,
        mouseDown,
        classes: index === 0 ? 'sticky left-0 bg-white z-20' : '',
      });
    }
    return child;
  });

  if (isFetching) {
    return null;
  }

  return (
    <table
      ref={tableRef}
      className={`h-[${MAX_TABLE_HEIGHT}px pb-[100%] flex-1 content-start border-collapse grid grid-cols-[minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(150px,3fr)] overflow-auto`}
    >
      <thead className='contents'>
        <tr className='contents'>{childrenWithProps}</tr>
      </thead>
      <tbody className='contents'>
        {data.data.map((row, indexxxxx) => (
          <tr key={row.id} className='contents'>
            <td className='sticky left-0 z-10 bg-white border-t-2 border-gray-100 min-w-[150px]'>
              {indexxxxx + Number(limit) * (Number(offset) - 1) + 1}
            </td>
            {Object.keys(row).map((item, index) => {
              if (children[index].props.name in row) {
                return (
                  <td
                    key={item}
                    className='border-t-2 border-gray-100 min-w-[150px]'
                  >
                    <span className='whitespace-nowrap text-ellipsis overflow-hidden block'>
                      {row[children[index].props.name]}
                    </span>
                  </td>
                );
              }
            })}
            <Actions id={row.id} />
            {/* <td className='border-t-2 border-gray-100 min-w-[150px]'>
              <button>-</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Head };
export default Table;

interface ActionsProps {
  id: string;
}

export const Actions: React.FC<ActionsProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const data = useData();
  const mutation = useMutation((id: string) => data.deleteLink(id), {
    onSuccess: () => {
      queryClient.refetchQueries('resource/links');
    },
  });

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    mutation.mutate(id);
  };

  return (
    <td className='border-t-2 border-gray-100 min-w-[150px]'>
      <button className='border-red-400 border-2' onClick={onClick}>
        -
      </button>
    </td>
  );
};
