import { Reducer, useEffect, useReducer, useRef } from 'react';

function reducer(state, action) {
  if (action.type === '') {
  }
}

type useTableProps = (el: HTMLTableElement) => void;

export const useTable: useTableProps = (el) => {
  if (el === undefined) {
    console.error(`${el} has not found`);
  }
  // console.log('el: ', el);
  useEffect(() => {
    if (el) {
      const thead = el.querySelector('thead');
      console.log(thead);
    }
  }, [el]);
};
