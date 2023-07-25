import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './Draggable.css';
import { debounce } from 'underscore';

//x, y 정사각형 내의 버튼 좌표
//x2, y2 마우스 이동 좌표
//x2-x, y2-y 정사각형 왼쪽 위 꼭지점 좌표

function Draggable({children, handleRef, onMove, x=0, y=0}) {
    const dragRef = useRef(null);
    const initialX = useRef(0);
    const initialY = useRef(0);
    const [position, setPosition] = useState({x, y});

    const Move = useMemo(() => debounce((x, y) => onMove(x, y), 500
    , [onMove]));

    const onMouseMove = useCallback((event) => {
        setPosition({
            x: event.clientX - initialX.current,
            y: event.clientY - initialY.current
        });
        // debounce 없이
        // onMove(event.clientX - initialX. current, event.clientY - initialY.current)
        // debounce 추가
        Move(event.clientX - initialX. current, event.clientY - initialY.current);
    }, [Move]);

    const removeEvents = useCallback(() => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", removeEvents);
        document.body.removeEventListener("mouseleave", removeEvents);
    }, [onMouseMove]);

    const onMouseDown = useCallback((event) => {
        const { left, top } = dragRef.current.getBoundingClientRect();
        initialX.current = event.clientX - left;
        initialY.current = event.clientY - top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", removeEvents);
        document.body.addEventListener("mouseleave", removeEvents);
    }, [onMouseMove, removeEvents]);

    useEffect(() => {
        const handle = handleRef.current;
        handle.addEventListener("mousedown", onMouseDown);
        return () => {
            handle.removeEventListener("mousedown", onMouseDown);
            // 간격 사이에 unmount가 발생했지만, debounce는 발생할 수 있음
            Move.cancel(); // debounce 취소
        }
    }, [handleRef, onMouseDown]);

    return(
        <div 
            ref={dragRef} 
            className='draggable' 
            style={{transform:`translate(${position.x}px, ${position.y}px)`}}>
            {children}
        </div>
    )
}

export default Draggable;