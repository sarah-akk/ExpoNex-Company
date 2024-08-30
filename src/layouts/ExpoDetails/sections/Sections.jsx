/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Sections.css';
import { createSection } from '../../../util/ExposHttp'
import { useAuth } from "../../../context/AuthContext";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Sections = () => {
  const { user } = useAuth();
  const { expo } = useOutletContext();
  const { width, height, sections } = expo.data;
  const [sectionId, setSectionId] = useState('');
  const [price, setPrice] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const token = user.accessToken;

  // Generate grid layout
  const generateGrid = () => {
    const grid = [];
    for (let r = 1; r <= height; r++) {
      for (let c = 1; c <= width; c++) {
        grid.push({ row: r, col: c });
      }
    }
    return grid;
  };

  const grid = generateGrid();

  // Map to hold position to section data
  const sectionPositions = {};
  const sectionColors = {}; // Object to store colors for each section

  sections.forEach(section => {
    section.positions.forEach(pos => {
      sectionPositions[pos] = section;
    });
    // Assign a random color to each section
    sectionColors[section.id] = getRandomColor();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSection(sectionId, price, token);
      if (response.status === 'success') {
        setModalMessage('Auction has been registered successfully.');
      } else {
        setModalMessage('Failed to register auction.');
      }
      setModalOpen(true);
    } catch (error) {
      setModalMessage('Error occurred while registering auction.');
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className='sections-container'>
      <h2>Sections:</h2>
      <div className='main-content'>
        <div className='grid-wrapper'>
          <div className='grid-container'>
            {grid.map((cell, index) => {
              const pos = (cell.row - 1) * width + cell.col;
              const section = sectionPositions[pos];
              const tooltipContent = section
                ? `ID: ${section.id}\nPrice: ${section.price}\nSize: ${section.size}`
                : '';

              return (
                <div
                  key={index}
                  className={`grid-cell ${section ? `section-${section.type}` : ''}`}
                  style={{
                    gridRow: cell.row,
                    gridColumn: cell.col,
                    backgroundColor: section ? sectionColors[section.id] : 'white',
                  }}
                  title={tooltipContent}
                >
                  {pos}
                </div>
              );
            })}
          </div>
        </div>
        <div className='form-con'>
          <div className='form-container'>
            <div>
              <h3>Want to have a section?</h3>
            </div>
            <div>
              <div className='formSec' >
                <label>
                  Section ID:
                  <input
                    type='number'
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Price:
                  <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </label>
                <button type='submit' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <p>{modalMessage} !!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sections;
