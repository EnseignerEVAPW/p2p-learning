import axios from 'axios';
import { useEffect, useState } from 'react';

function ImageUploader() {
    const [images, setImages] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/images')
        .then(response => {
            setImages(response.data)
        })
        .catch(error =>{
            console.error('No se obtuvieron las imagenes');
        });
    },[]);

    const defaultStyle ={
        container:{
            display: 'flex',
            flexWrap: 'wrap',
        },imagenes:{
            margin: '20px',
            width:'400px',
            height:'410px',
        }, each:{
            width:'400px',
            height:'410px',
            objectFit: 'fill',
        }
    }

    return (
        <div style={defaultStyle.container}>
            {images.map(imgs => (
                <div key={imgs.id} style={defaultStyle.imagenes}>
                    <img style={defaultStyle.each} src={`http://localhost:3000/images/${imgs.filename}`} alt='imagen'/>
                </div>
            ))}
        </div>
    )
}

export default ImageUploader;