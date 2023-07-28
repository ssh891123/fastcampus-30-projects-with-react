import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import AddIcon from '@mui/icons-material/Add';
import Memo from './Memo/Memo';

function App({store}) {
  const AddMemo = useCallback(() => store.addMemo(), [store]);
  const Edit = useCallback((id, content) => {
    store.editMemo(id, content)
  }, [store]);

  return (
    <> {
      store.memos.map((memo) => <Memo key={memo.id} item={memo} Edit={Edit} />)
    }
    <AddIcon 
      sx={{
        float:"right", 
        backgroundColor: "#e4e4e4", 
        borderRadius:"5px", 
        cursor:"pointer", 
        fontSize:"30px",
        border: "1px solid black"
      }}
      onClick={AddMemo}/>
    </>
  );
}

export default observer(App);
