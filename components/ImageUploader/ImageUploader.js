import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { postPinata } from '../../pinata/pinata.js';

export default function ImageUploader(props) {
  const { getNewImage, address } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitNFT = async () => {
    await postPinata(selectedImage, name, description, address);
    setSelectedImage(null);
    setName('');
    setDescription('');
    setTimeout(getNewImage, 2000);
  };

  return (
    <div className="flex flex-col p-4 items-center justify-items-center mx-auto my-auto">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h2 className="font-normal text-2xl my-2 text-center">Create Your NFT</h2>
          {selectedImage ? (
            <div className="flex flex-col items-center justify-items-center">
              <img
                className="h-48 w-48 my-2 mx-auto"
                alt="not fount"
                width={'250px'}
                src={URL.createObjectURL(selectedImage)}
              />
            </div>
          ) : (
            <div>
              <img
                className="h-48 w-48 my-2 mx-auto"
                alt="not fount"
                width={'250px'}
                src="/images/upload.png"
              />
            </div>
          )}
          <br />
          <div className="flex flex-col sm:flex-row">
            <TextField
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="outlined-basic"
              label="NFT Name"
              variant="outlined"
              className="mx-2 my-2"
            />
            <TextField
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              className="mx-2 my-2"
            />
            <Button className="mx-1 my-1" variant="contained" component="label">
              Upload
              <input
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <Button className="mx-1 my-1" onClick={submitNFT} variant="contained" component="label">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
