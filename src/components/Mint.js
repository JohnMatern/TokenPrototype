import React, { useEffect } from 'react';
import { useState } from 'react';
const { create } = require('ipfs-http-client');
const ipfs = create(new URL("http://ipfs.infura.io:5001"));

/* eslint-disable no-console */
const Mint = () => {

  const [state, setState] = useState({
    id: "",
    description: "",
  })
  const [file, setFiles] = useState();
  const [cid, setCid] = useState('')





  async function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const onFileUpload = async (event) => {
    setFiles(event.target.files[0])
  }



  async function submit() {
    let randPath = Math.round(Math.random() * 100000);
    let upload = [];

    upload.push({ path: '/'+randPath+'/meta.json', content: JSON.stringify(state) });
    upload.push({ path: '/'+randPath+'/' + file.name, content: file });

    ipfs.add(upload).then(
      response => {
        dinge(response)
        console.log(response)
      }
    )
    //console.log(ipfsPath);
    // fetch('https://ipfs.io/ipfs/' + cid.string)
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }



  const dinge = (response) => {
    console.log('aaaaah')
    setCid(response.string)
  }
  useEffect(() => {
    console.log('cid: '+cid)
  },[])

  return (
    <div className="container contact-form">
      <div className="contact-image">
        <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
      </div>


      <div className="row">
        <h3> Minte deinen NFT</h3>
        <div className="col-md-12">
          <div className="form-group">
            <input type="text" name="id" className="form-control" id="id" placeholder="NFT Name" value={state.id} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" name="description" className="form-control" id="description" placeholder="Beschreibung" value={state.description} onChange={handleChange} />
          </div>
          {/*
                    <div className="form-group">
                        <input type="text" name="image" className="form-control" id="image" placeholder="IPFS hash"  />
                    </div>
                    <div className="form-group">
                        <input type="text" name="address" className="form-control" id="address" placeholder="Wallet Addresse"  />
                    </div> */}
          <label htmlFor="formFile" className="form-label">Lade dein Bild für den NFT hoch!</label>
          <input className="form-control" type="file" id="file" onChange={onFileUpload}></input>
          <div className="form-group">
            <button type="submit" name="btnSubmit" className="btnContact" value="Mint NFT" onClick={submit}> Mint </button>
          </div>
        {cid && <a href={'https://ipfs.io/ipfs/'+cid}>Your files on ipfs</a>}

        </div>

      </div>

    </div>
  );
}

export default Mint;