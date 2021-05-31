import React from 'react';
import {useState} from 'react';
const { create } = require('ipfs-http-client');
const ipfs = create(new URL("http://ipfs.infura.io:5001"));
/* eslint-disable no-console */
const Mint = () => {
  const [state, setState] = useState({
    id: "",
    description: "",
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  async function submit() {
    
    const cid = await ipfs.add(JSON.stringify(state));
 
    console.log("IPFS cid:", cid);
    //console.log(ipfsPath);
    fetch('https://ipfs.io/ipfs/'+cid.path)
      .then(response => response.json())
      .then(data => console.log(data));
    
  }
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
        <input className="form-control" type="file" id="file"></input>
        <div className="form-group">
          <button type="submit" name="btnSubmit" className="btnContact" value="Mint NFT" onClick={submit}> Mint </button>
        </div>
      </div>

    </div>

  </div>
  );
}

export default Mint;