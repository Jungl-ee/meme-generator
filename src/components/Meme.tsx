import { useState, useEffect } from "react"

export default function Meme() {
    const [meme, setMeme] = useState<any>({
        image: "",
        topText: "",
        bottomText: ""
    });

    const [memesData, setMemesData] = useState<any>([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(data => data.json())
        .then(data => setMemesData(data.data.memes))
    }, [])

    function getMeme() {
        const n = Math.floor(Math.random() * memesData.length);
        const url = memesData[n].url
        setMeme((prevMeme: any) => ({ ...prevMeme, image: url }))
    }

    function handleChange(e:any) {
        const {name, value} = e.target;
        setMeme((prevMeme:any) => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Top text"
                        name="topText" 
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Bottom text"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </div>
                <button onClick={getMeme}> Get a new meme image 📸 </button>
            </div>
            <div className="meme-container">
                <img className="meme" src={meme.image} alt="" />
                {meme.topText && <p className="top-text"> {meme.topText} </p>}
                {meme.bottomText && <p className="bottom-text"> {meme.bottomText} </p>}
            </div>
        </main>
    )
}