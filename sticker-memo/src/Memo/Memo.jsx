import React, { useMemo, useRef, useEffect } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from '@ssh891123/draggable';
import { debounce } from 'underscore';
    
  function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
    const handleRef = useRef(null);
    const onChangeMemo = useMemo(
        () => debounce(e => Edit(item.id, e.target.value), 500)
    , [item.id, Edit]);

    useEffect( ()=>{
        return () => {
            // 메모가 삭제됐을때, debounce 종료
            onChangeMemo.cancel();
        };
    }, [onChangeMemo]);

    return (
        <Draggable handleRef={handleRef} x={0} y={0} onMove={(x, y) => console.log(x, y)}>
            <div
                className="memo-container"
                style={{ width: `${250}px`, height: `${300}px` }}
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