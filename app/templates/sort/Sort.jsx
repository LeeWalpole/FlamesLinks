"use client";
import React, { useState } from "react";
import { ListManager } from "react-beautiful-dnd-grid";

const list = [
  {
    id: "0",
    order: 0,
    name: "a",
  },
  {
    id: "1",
    order: 1,
    name: "b",
  },
  {
    id: "2",
    order: 2,
  },
  {
    id: "3",
    order: 3,
  },
  {
    id: "4",
    order: 4,
  },
];

function App() {
  const [sortedList, setSortedList] = useState(sortList(list));

  function sortList(list) {
    return list.slice().sort((first, second) => first.order - second.order);
  }

  function reorderList(result) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const updatedList = Array.from(sortedList);
    const draggedItem = updatedList[source.index];
    updatedList.splice(source.index, 1);
    updatedList.splice(destination.index, 0, draggedItem);

    const orderedList = updatedList.map((item, index) => {
      if (index === destination.index) {
        return { ...item, order: destination.index };
      }
      if (source.index < destination.index) {
        if (index > source.index && index <= destination.index) {
          return { ...item, order: item.order - 1 };
        }
      } else {
        if (index >= destination.index && index < source.index) {
          return { ...item, order: item.order + 1 };
        }
      }
      return item;
    });

    setSortedList(orderedList);
  }

  function ListElement({ item: { id, name } }) {
    return (
      <div className="sort-grid-3-item">
        <div>{id}</div>
        <div>{name}</div> {/* Added line */}
      </div>
    );
  }

  return (
    <div className="App">
      <ListManager
        items={sortedList}
        direction="horizontal"
        maxItems={3}
        render={(item) => <ListElement item={item} />}
        onDragEnd={reorderList}
      />
    </div>
  );
}

export default App;
