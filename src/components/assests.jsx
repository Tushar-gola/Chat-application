import { Box, Grid, IconButton } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function Assests({ close, toggleAssets }) {
    const [selectedFile, setSelectedFile] = React.useState(null);
    // const [uploadProgress, setUploadProgress] = React.useState(0);

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    // }
    console.log(selectedFile);
    return (
        <Box sx={{ width: "100%", height: "180px", position: "absolute", zIndex: toggleAssets ? "1" : '-1', bottom: toggleAssets ? "92px" : '70px', visibility: toggleAssets ? "visible" : "hidden", transition: ".2s ease" }}>
            <IconButton onClick={close}>
                <CloseIcon />
            </IconButton>
            <Grid container>
                <Grid item xs={3} sx={{ padding: "1rem" }}>
                    <Button component="label" sx={{ width: "100%", height: "120px" }} variant="outlined" startIcon={<CloudUploadIcon style={{ fontSize: "3rem" }} />}>
                        Upload image
                        <VisuallyHiddenInput type="file" onChange={(e) => console.log(e.target.files[0])} />
                    </Button>
                </Grid>
                <Grid item xs={3} sx={{ padding: "1rem" }}>
                    <Button component="label" sx={{ width: "100%", height: "120px" }} variant="outlined" startIcon={<CloudUploadIcon style={{ fontSize: "3rem" }} />}>
                        Upload video
                        <VisuallyHiddenInput type="file" accept="video/*" onChange={(e) => console.log(e.target.files[0])} />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
