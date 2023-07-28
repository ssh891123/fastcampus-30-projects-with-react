메모장 구현

library한 Draggable Component를 이용하여 메모장 Component 구현

메모장 state를 mobx를 이용하여 store에 저장

store를 localStorage로 관리하였고, 브라우저가 껏다 켜져도 유지되도록 함

[+]추가하고 싶은 거
mouseup일 때, position이 강제 저장되도록
position 정보는 debounce로 관리하는데 0.5마다 position이 저장되도록 함
그 사이에 mouseup이 되면 position이 저장안되서 
메모 위치가 잘못 나오는 경우가 있음
