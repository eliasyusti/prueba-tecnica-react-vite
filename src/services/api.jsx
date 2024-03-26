import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './api.css';

function Api() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (character) => {
    setSelectedCharacter(character);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="container">
      <h1>Personajes de Rick and Morty</h1>
      <div className="characters-container">
        {characters.map((character) => (
          <div key={character.id} className="character">
            <img src={character.image} alt={character.name} />
            <div className="details">
              <p><strong>Nombre:</strong> {character.name}</p>
              <p><strong>Especie:</strong> {character.species}</p>
              <p><strong>Estado:</strong> {character.status}</p>
              <button color='primary' onClick={() => handleDetailsClick(character)}>Ver mas detalles</button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedCharacter && (
          <>
            <DialogTitle>Detalles de {selectedCharacter.name}</DialogTitle>
            <DialogContent>
              <img src={selectedCharacter.image} alt={selectedCharacter.name} />
              <p><strong>Nombre:</strong> {selectedCharacter.name}</p>
              <p><strong>Especie:</strong> {selectedCharacter.species}</p>
              <p><strong>Estado:</strong> {selectedCharacter.status}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default Api;
