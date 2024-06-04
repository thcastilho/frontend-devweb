import React from 'react';
import Footer from '../components/Footer.js';
import singleData from '../data/single-data.json'
import musicData from '../data/album-data.json';
import '../styles/Home.modules.css'
import { Rating } from '@mui/material';

export default function Home() {
    return (
        <>
            <div className="container">
                <h1 className="title">Novas músicas</h1>
                <div className="music-container">
                    {singleData.map(item => (
                        <div key={item.id} className="music-item">
                            <img src={item.image} alt={item.name} />
                            <p className="music-name">{item.name}</p>
                            <p>{item.artist}</p>
                            <Rating
                                value={item.avgStars}
                                precision={0.5}
                                readOnly
                                max={5}
                            />
                        </div>
                    ))}
                </div>
                <h1 className="title">Novos álbuns</h1>
                <div className="music-container">
                    {musicData.map(item => (
                        <div key={item.id} className="music-item">
                            <img src={item.image} alt={item.name} />
                            <p className="music-name">{item.name}</p>
                            <p>{item.artist}</p>
                            <Rating
                                value={item.avgStars}
                                precision={0.5}
                                readOnly
                                max={5}
                            />
                        </div>
                    ))}
                </div>
                <p></p>
            </div>
            <Footer />
        </>
    );
}