import React, { useState,useEffect } from "react";
import { useDrop } from "react-dnd";
import { List, arrayMove, arrayRemove } from "react-movable";
import { Action } from "./data";
const RemovableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x-circle"
  >
    <title>Remove</title>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const buttonStyles = {
  border: "none",
  margin: 0,
  padding: 0,
  width: "auto",
  overflow: "visible",
  paddingRight: 5,

  position: "relative",
  bottom: 15,
  right: 20,
  cursor: "pointer",
  background: "transparent",
};

const DndArea = () => {
  const [items, setItems] = useState(["Start"]);
  const [destination, setDestination] = useState(0);
 
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: "tool",

    drop: (item) => {
      if (destination !== 0) {
        let index = Number(destination);
        index += 1;
        items.splice(index, 0, item.name);
      } else {
        items.splice(destination, 0, item.name);
      }

      setItems([...items]);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  useEffect(() => {
    let index = Number(destination);
    index += 1;
    let pulseEffect = document.getElementById(`${index}-1`);
     let timer=setTimeout(() =>{

      if(pulseEffect !==null) {
        pulseEffect.setAttribute("class","blob")
      }
     
    },1)
  
    let clearTimer=setTimeout(() =>{
      if(pulseEffect !==null) {
        pulseEffect.removeAttribute("class","blob")
      }
    },4000)
    return () => clearTimeout(clearTimer);

  }, [destination])
 
 

  return (
    <div className={`drop-area ${canDrop ? "highlight" : ""}`} ref={drop}>
      <List
        values={items}
        ref={drop}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props, index }) => (
          <li {...props}>
            <div id={`${index}-1`} className="frame-line">
       
              <div className="list-item">
                <button
                  onClick={() => {
                    setItems(
                      typeof index !== "undefined" && value !== "Start"
                        ? arrayRemove(items, index)
                        : items
                    );
                  }}
                 
                  style={buttonStyles}
                >
                  {value !== "Start" ? (
                    <RemovableIcon />
                  ) : (
                    <span style={{ marginLeft: 25 }}> </span>
                  )}
                </button>
                {Action.filter((item) => item.Action.includes(value)).map(
                  (data) => (
                    <img className="logo-img" src={data.logoImg} />
                  )
                )}
                {value === "Start" && (
                  <img
                    className="logo-img "
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KPHBhdGggZmlsbD0iIzQ0NDQ0NCIgZD0iTTggMGMtNC40IDAtOCAzLjYtOCA4czMuNiA4IDggOCA4LTMuNiA4LTgtMy42LTgtOC04ek02IDEydi04bDYgNC02IDR6Ij48L3BhdGg+Cjwvc3ZnPgo="
                  />
                )}
              </div>
              <p className="list-title" style={{ marginTop: "3px" }}>
                {value}
              </p>
            </div>
            <div
              className={`drop-area ${canDrop ? "highlight" : ""}`}
              ref={ondrop}
              id={index}
              onDragOver={(e) => setDestination(e.target.id)}
            >
              <div className="line"></div>
            </div>
          </li>
        )}
      />
      <ul>
      
          <li>
            <img
              style={{ width: 32, height: 32 }}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzAuMDUgMzAuMDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwLjA1IDMwLjA1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDMwMTA0OyIgZD0iTTE4Ljk5MywxMC42ODhoLTcuOTM2Yy0wLjE5LDAtMC4zNDYsMC4xNDktMC4zNDYsMC4zNDJ2OC4wMjJjMCwwLjE4OSwwLjE1NSwwLjM0NCwwLjM0NiwwLjM0NA0KCQloNy45MzZjMC4xOSwwLDAuMzQ0LTAuMTU0LDAuMzQ0LTAuMzQ0VjExLjAzQzE5LjMzNiwxMC44MzgsMTkuMTgzLDEwLjY4OCwxOC45OTMsMTAuNjg4eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMwMzAxMDQ7IiBkPSJNMTUuMDI2LDBDNi43MjksMCwwLjAwMSw2LjcyNiwwLjAwMSwxNS4wMjVTNi43MjksMzAuMDUsMTUuMDI2LDMwLjA1DQoJCWM4LjI5OCwwLDE1LjAyMy02LjcyNiwxNS4wMjMtMTUuMDI1UzIzLjMyNCwwLDE1LjAyNiwweiBNMTUuMDI2LDI3LjU0Yy02LjkxMiwwLTEyLjUxNi01LjYwNC0xMi41MTYtMTIuNTE1DQoJCWMwLTYuOTE0LDUuNjA0LTEyLjUxNywxMi41MTYtMTIuNTE3YzYuOTEzLDAsMTIuNTE0LDUuNjAzLDEyLjUxNCwxMi41MTdDMjcuNTQsMjEuOTM2LDIxLjkzOSwyNy41NCwxNS4wMjYsMjcuNTR6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            />
            <p>Finish</p>
          </li>
       
      </ul>
    </div>
  );
};

export default DndArea;

/*
let [newList]= finalList.splice(sourceItem,1);
    finalList.splice(destinationItem,0,newList)
    console.log(finalList)
    setList(finalList)

    */

/*
<div className="list-item">
                          <button
                            onClick={() => {
                              setItems(
                                typeof index !== "undefined"
                                  ? arrayRemove(items, index)
                                  : items
                              );
                            }}
                            style={buttonStyles}
                          >
                            <RemovableIcon />
                          </button>
                          {Action.filter((item) =>
                            item.Action.includes(value)
                          ).map((data) => (
                            <img
                              style={{ width: 32, height: 32 }}
                              src={data.logoImg}
                            />
                          ))}

                          <p>{value}</p>
                        </div>
                        <Slider disabled orientation="vertical" />


*/
