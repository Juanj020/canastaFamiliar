import React, { Component } from 'react';
import './App.css';

let nextId = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      artists: [],
      editingProd: null,
      isEditing: false,
    };
  }

  editArtist = (artist) => {
    this.setState({
      editingProd: artist,
      name: artist.name,
      isEditing: true,
    });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleAddOrUpdateArtist = () => {
    const { artists, editingProd, name, isEditing } = this.state;
    if (isEditing) {
      const updatedArtists = artists.map((artist) =>
        artist.id === editingProd.id ? { ...artist, name } : artist
      );
      this.setState({
        artists: updatedArtists,
        isEditing: false,
        name: '',
        editingProd: null,
      });
    } else {
      this.setState((prevState) => ({
        artists: [
          ...prevState.artists,
          { id: nextId++, name: prevState.name },
        ],
        name: '',
      }));
    }
  };

  handleDeleteArtist = (artistId) => {
    this.setState((prevState) => ({
      artists: prevState.artists.filter((artist) => artist.id !== artistId),
    }));
  };

  render() {
    const { name, artists, isEditing } = this.state;

    return (
      <header className='encabezado'>
        <h1>Escriba el producto de la canasta:</h1>
        <input value={name} onChange={this.handleNameChange} />
        <button onClick={this.handleAddOrUpdateArtist}>
          {isEditing ? 'Guardar' : 'Añadir'}
        </button>
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              {artist.name}{' '}
              <button onClick={() => this.editArtist(artist)}>Editar</button>
              <button onClick={() => this.handleDeleteArtist(artist.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </header>
    );
  }
}

export default App;
