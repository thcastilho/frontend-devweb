import React from 'react';
import data from "../data/post-data.json"
import '../styles/Home.modules.css'
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    const singles = data.filter(item => item.categoria === 0)
    const albuns = data.filter(item => item.categoria === 1)

    return (
        <>
            <div className="container">
                <h1 className="title">Novas músicas</h1>
                <div className="music-container">
                    {singles.map(item => (
                        <div key={item.id} className="music-item">
                            <img src={item.image} alt={item.name} />
                            <Link to={`/post/${item.id}`} >
                                <p className="music-name">{item.name}</p>
                            </Link>
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
                    {albuns.map(item => (
                        <div key={item.id} className="music-item">
                            <img src={item.image} alt={item.name} />
                            <Link to={`/post/${item.id}`} >
                                <p className="music-name">{item.name}</p>
                            </Link>
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
        </>
    );
}