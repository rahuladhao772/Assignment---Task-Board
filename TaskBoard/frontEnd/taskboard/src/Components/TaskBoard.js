import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'LIST_ITEM';
//creates a reference to useDrag
const ListItem = ({ item, index, listName, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index, listName },
  });
//checked and moved items
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (dragged) => {
      if (dragged.index !== index || dragged.listName !== listName) {
        moveItem(dragged.index, index, dragged.listName, listName);
        dragged.index = index;
        dragged.listName = listName;
      }
    },
  });

  return (
    //removing nodes
    <div
      ref={(node) => ref(drop(node))}
      style={{ padding: '8px', border: '1px solid #ccc', margin: '4px', cursor: 'grab' }}
    >
      {item}
    </div>
  );
};

const App = () => {
  //list items
  const [lists, setLists] = useState({
    List1: ['Item 1', 'Item 2', 'Item 3'],
    List2: ['Item 4', 'Item 5'],
    List3: ['Item 6', 'Item 7', 'Item 8', 'Item 9'],
    List4: ['Item 10'],
  });
//move items
  const moveItem = (fromIndex, toIndex, fromList, toList) => {
    const updatedLists = { ...lists };
    const [item] = updatedLists[fromList].splice(fromIndex, 1);
    updatedLists[toList].splice(toIndex, 0, item);
    setLists(updatedLists);
  };
//update list after moved
  const handleDrop = (item, toList) => {
    const updatedLists = { ...lists };
    for (const listName in updatedLists) {
      if (listName !== toList && updatedLists[listName].includes(item)) {
        updatedLists[listName] = updatedLists[listName].filter((i) => i !== item);
        break;
      }
    }
    updatedLists[toList].push(item);
    setLists(updatedLists);
  };

  const [newItem, setNewItem] = useState('');
  
//add new list item
  const handleAddNewItem = () => {
    if (newItem.trim() !== '') {
      setLists((prevLists) => ({ ...prevLists, List4: [...prevLists.List4, newItem] }));
      setNewItem('');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "20px", padding: '20px' }}>
        <div style={{ flex: "1", height: "300px", margin: "20px", padding: '15px', boxShadow: "2px 2px 5px", backgroundColor: "#fcfbf1" }}>
          <h2>List 1</h2>
          {lists.List1.map((item, index) => (
            <ListItem
              key={item}
              item={item}
              index={index}
              listName="List1"
              moveItem={moveItem}
            />
          ))}
        </div>
        <div style={{ flex: "1", margin: "20px", padding: '15px', boxShadow: "2px 2px 5px", backgroundColor: "#fcfbf1", }}>
          <h2>List 2</h2>
          {lists.List2.map((item, index) => (
            <ListItem
              key={item}
              item={item}
              index={index}
              listName="List2"
              moveItem={moveItem}
            />
          ))}
        </div>
        <div style={{ flex: "1", margin: "20px", padding: '15px', boxShadow: "2px 2px 5px", backgroundColor: "#fcfbf1", }}>
          <h2>List 3</h2>
          {lists.List3.map((item, index) => (
            <ListItem
              key={item}
              item={item}
              index={index}
              listName="List3"
              moveItem={moveItem}
            />
          ))}
        </div>
        <div style={{ flex: "1", margin: "20px", padding: '15px', boxShadow: "2px 2px 5px", backgroundColor: "#fcfbf1", }}>
          <h2>List 4</h2>
          <input
            style={{ maxWidth: "272px", marginLeft: "5px" }}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button style={{ margin: "5px" }} onClick={handleAddNewItem}>Add</button>
          {lists.List4.map((item, index) => (
            <ListItem
              key={item}
              item={item}
              index={index}
              listName="List4"
              moveItem={moveItem}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
