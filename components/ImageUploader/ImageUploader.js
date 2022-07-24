import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitNFT = async () => {
    const data = new FormData();
    data.append('files', selectedImage);
    data.append('name', name);
    data.append('wrapWithDirectory', 'false');
    data.append('metadata', '{"keyvalues": { "description": "' + description + '" }}');
    data.append('pinToIPFS', 'false');

    const config = {
      method: 'post',
      url: 'https://managed.mypinata.cloud/api/v1/content',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_SUBMARINE_KEY,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    console.log(config);

    axios(config).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <div className="flex flex-col items-center justify-items-center mx-auto my-auto">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h2 className="font-light text-2xl my-2 text-center">Upload Your Image</h2>
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
                src="/tempupload.png"
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