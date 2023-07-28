import React, { useMemo, useRef, useEffect } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from '@ssh891123/draggable';
import { debounce } from 'underscore';
import { useLayoutEffect } from "react";
    
  function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
    const handleRef = useRef(null);
    const memoContainer = useRef(null);
    const onChangeMemo = useMemo(
        //메모에 입력될 때 호출되는 onChange는 자주 호출되므로 debounce로 최적화
        () => debounce(e => Edit(item.id, e.target.value), 500)
    , [item.id, Edit]);

    useEffect( ()=>{
        return () => {
            // 메모가 삭제됐을때, debounce 종료
            onChangeMemo.cancel();
        };
    }, [onChangeMemo]);

    const onChangeSize = useMemo(
        //메모 크기를 변경시키는 이벤트는 빈번하게 발생되므로 debounce로 최적화
        () => debounce((entry) => {
            const { width, height } = entry[0].contentRect;
            SetWidthHeight(item.id, width, height);
        }, 100), [item.id, SetWidthHeight]
    )

    useLayoutEffect(() => {
        // resize observer
        let RO = new ResizeObserver(onChangeSize);
        RO.observe(memoContainer.current);
        return () => {
            RO.disconnect();
            RO = null;
        }
    });

    return (
        <Draggable handleRef={handleRef} x={0} y={0} onMove={(x, y) => console.log(x, y)}>
            <div
                className="memo-container"
                style={{ width: `${250}px`, height: `${300}px` }}
                ref={memoContainer}
            >
                <div className="menu">
                    <DragHandleIcon 
                        ref={handleRef}
                        sx={{ cursor: "move", fontSize: "25px" }} />
                    <CloseIcon
                        sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
                    />
                </div>
                <textarea
                    className="memo-text-area"
                    defaultValue={item.content}
                    name="txt"
                    placeholder="Enter memo here"
                    onChange={onChangeMemo}
                ></textarea>
            </div>
        </Draggable>
    );
  }
  
  export default Memo;