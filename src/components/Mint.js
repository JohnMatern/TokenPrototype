import React from 'react'

const Mint = () => {
  return (
    <div className="container contact-form">
    <div className="contact-image">
      <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
    </div>

    <h3> Minte deinen NFT</h3>
    <div className="row">
      <div className="col-md-11">
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
        <div className="form-group">
          <button type="submit" name="btnSubmit" className="btnContact" value="Mint NFT" onClick={submit}> Submit </button>
        </div>
      </div>

    </div>

  </div>
  );
}

export default Mint;