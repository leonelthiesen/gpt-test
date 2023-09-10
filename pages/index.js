import { useState } from 'react';
import styles from '../styles/home.module.css';
import { AppBar, Toolbar, Typography, Button, IconButton, TextareaAutosize } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default function RecipeInfo() {
  const [recipe, setRecipe] = useState("");
  const [nutrition, setNutrition] = useState("");

  const handleChange = (event) => {
    setRecipe(event.target.value);
  }

  const handleClear = () => {
    setRecipe("");
    setNutrition("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/openai/generateinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe: recipe })
    });

    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      setNutrition(jsonResponse.data);
    }
  }

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Nutrition Facts
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={styles.content}>
        <h1>Find Nutrition Facts for any recipe</h1>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize value={recipe} onChange={handleChange}
            placeholder="Enter recipe to get nutrition facts"
            style={{
              width: "98%",
              maxWidth: "850px",
              minHeight: "200px",
              padding: "10px",
            }} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="secondary"
            onClick={handleClear}
          >
            Clear
          </Button>
        </form>
        <div>
          <p>Nutrition Facts:</p>
          <p>{nutrition}</p>
        </div>
      </div>
    </main>
  )
}
