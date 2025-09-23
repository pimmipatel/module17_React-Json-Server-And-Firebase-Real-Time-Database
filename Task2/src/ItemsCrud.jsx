import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function ItemsCrud({ user }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  const colRef = collection(db, 'items');

  const fetchItems = async () => {
    const snapshot = await getDocs(colRef);
    setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, 'items', editingId), { title });
      setEditingId(null);
    } else {
      await addDoc(colRef, { title, userId: user.uid });
    }
    setTitle('');
    fetchItems();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setEditingId(item.id);
  };

  return (
    <div>
      <h2>CRUD with Firestore</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter item"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} <button onClick={() => handleEdit(item)}>Edit</button>{' '}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
