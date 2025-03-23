import React, { useState } from 'react';
import './CrudApp.css';

function CrudApp() {
  // Initial data
  const [items, setItems] = useState([
    { id: 1, text: 'Akula' },
    { id: 2, text: 'Yagnesh' },
    { id: 3, text: 'murthy' }
  ]);
  
  // State for the input field
  const [inputText, setInputText] = useState('');
  
  // State to track if we're editing (and which item)
  const [editingId, setEditingId] = useState(null);
  
  // Add a new item
  const addItem = () => {
    if (inputText.trim() === '') return;
    
    const newItem = {
      id: Date.now(),
      text: inputText
    };
    
    setItems([...items, newItem]);
    setInputText('');
  };
  
  // Update an existing item
  const updateItem = () => {
    if (inputText.trim() === '') return;
    
    setItems(items.map(item => 
      item.id === editingId ? { ...item, text: inputText } : item
    ));
    
    setInputText('');
    setEditingId(null);
  };
  
  // Handle edit button click
  const handleEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setInputText(itemToEdit.text);
    setEditingId(id);
  };
  
  // Handle delete button click
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId !== null) {
      updateItem();
    } else {
      addItem();
    }
  };
  
  return (
    <div className="crud-container">
      <div className="crud-card">
        <h1 className="crud-title">React CRUD App</h1>
        
        <form onSubmit={handleSubmit} className="crud-form">
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="Code Artistique" 
            className="crud-input"
          />
          <button type="submit" className="crud-button update-button">
            {editingId !== null ? 'Update' : 'Add'}
          </button>
        </form>
        
        <div className="crud-items">
          {items.map(item => (
            <div key={item.id} className="crud-item">
              <span className="item-text">{item.text}</span>
              <div className="item-buttons">
                <button 
                  className="crud-button edit-button" 
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button 
                  className="crud-button delete-button" 
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CrudApp;