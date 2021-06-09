import React, { useEffect } from 'react';
import { useState } from 'react';
import { Context } from '../utils/Store';
import { useContext} from 'react';
import TxModal from './TxModal';

const { create } = require('ipfs-http-client');
const ipfs = create(new URL("http://ipfs.infura.io:5001"));



// 0xea14450dB8747e70Cd101532a44E267E798Cc010 Adresse

//[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"attributes","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
/* eslint-disable no-console */
const Mint = () => {
  const [state, dispatch] = useContext(Context);
  const [meta, setMeta] = useState({
    id: "",
    description: "",
  })
  const [file, setFiles] = useState();
  const [cidMeta, setCidMeta] = useState('');
  const [cidImage, setCidImage] = useState('');

  async function handleChange(evt) {
    const value = evt.target.value;
    setMeta({
      ...meta,
      [evt.target.name]: value
    });
  }

  const onFileUpload = async (event) => {
    setFiles(event.target.files[0])
  }

  const send = async () => {
    console.log(meta.id, meta.description,cidImage, cidMeta )
    const data = state.nft.methods.mint(meta.id, meta.description,cidImage, cidMeta ).encodeABI();
    
    const args = { from: state.account, to: state.nftaddress, data }
    await dispatch({ type: 'SET_TX', payload: args });
    setTimeout(async () => {
      await dispatch({ type: 'SET_MODAL', payload: true });
    }, 1000)
}

  const submit = async () => {
    let randPath = Math.round(Math.random() * 100000);
    let upload = [];
    let cid2 = await ipfs.add({ path: '/' + file.name, content: file })
    let cid3 = await ipfs.add({ path: '/meta.json', content: JSON.stringify(meta) })

    console.log(cid2)
    console.log(cid3)
    setCidMeta(cid3.cid.string)
    setCidImage(cid2.cid.string)
    //console.log(ipfsPath);
    // fetch('https://ipfs.io/ipfs/' + cid.string)
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }

  useEffect(() => { },[state.tx, state.modal])




  return (
    <div className="container contact-form">
      <div className="contact-image">
        <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
      </div>


      <div className="row">
        <h3> Minte deinen NFT</h3>
        <div className="col-md-12">
          <div className="form-group">
            <input type="text" name="id" className="form-control" id="id" placeholder="NFT Name" value={meta.id} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="description" className="form-control" id="description" placeholder="Beschreibung" value={meta.description} onChange={handleChange} required />
          </div>
          {/*
                    <div className="form-group">
                        <input type="text" name="image" className="form-control" id="image" placeholder="IPFS hash"  />
                    </div>
                    <div className="form-group">
                        <input type="text" name="address" className="form-control" id="address" placeholder="Wallet Addresse"  />
                    </div> */}
          <label htmlFor="formFile" className="form-label">Lade dein Bild für den NFT hoch!</label>
          <input className="form-control" type="file" id="file" onChange={onFileUpload} required></input>
          <div className="form-group">
            <button type="submit" name="btnSubmit" className="btnContact" value="Mint NFT" onClick={submit}> Mint </button>
          </div>
        

        </div>
        <button type="submit" name="btnSubmit" className="btnContact" value="Mint NFT" onClick={send}> Senden </button>
      </div>
      { state.modal && <TxModal />}


    </div>
  );
}

export default Mint;