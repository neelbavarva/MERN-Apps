import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
        Axios.get("http://localhost:4545/read")
            .then((response) => {
              setFoodList(response.data);
            })
  },[])

  const addToList = () => {
    Axios.post("http://localhost:4545/insert",{
      foodName: foodName,
      days: days,
    })
  }

  const updateFood = (id, oldName) => {
    console.log(`Want to update the Name: Old-Name-${oldName}   New-Name-${newFoodName}`);
    Axios.put("http://localhost:4545/update", {
      id: id,
      newFoodName: newFoodName,
    })
    console.log(`id:${id} and newFoodName:${newFoodName}`);
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:4545/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>Yo there</h1><br/>

      <label>foodName</label><br/>
      <input type="text" onChange={(event) =>{
        setFoodName(event.target.value);
      }} /><br/><br/>
      <label>daysSinceIAte</label><br/>
      <input type="number" onChange={(event) =>{
        setDays(event.target.value);
      }}/><br/><br/>
      <button onClick={addToList}>Add to List</button>
      
      <h3>FoodList</h3>
      <hr/>
      {foodList.map((val,key) => {
        return (
          <div key={key}>
            <h6>{val.foodName}</h6><h5>{val.daysSinceIAte}</h5>{" "}
            <input type="text" placeholder="Update..." 
            onChange={(event) =>{
              setNewFoodName(event.target.value)} }/>
            <button onClick={() => updateFood(val._id, val.foodName)}>Update</button><br/>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
            <hr/>
          </div>
        );
      })}
    </div>
  );
}

export default App;
