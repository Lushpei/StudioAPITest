import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import {Link} from "react-router-dom";
import {serverURL, key} from '../config'
import Layout from "../components/Layout"
import {DialogBox} from "../components/DialogBox/DialogBox";

export const StudiosItemsList = () => {

  const [studioItems, setStudioItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStudioItem, setSelectedStudioItem] = React.useState(0);
  const handleClickOpen = (studioItemId) => {
    setOpen(true);
    setSelectedStudioItem(studioItemId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    studioItemsGet()
  }, [])

  const studioItemsGet = () => {
    fetch(`${serverURL}/api/${key}/StudioItems`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.success) {
            setStudioItems(result.data);
          }
        }
      ).catch(function (error) {
      console.log(error);
    })
  }

  const handleDelete = (id) => {
    fetch(`${serverURL}/api/${key}/studioItems/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.success) {
            setStudioItems(result.data);
          }
        }
      ).catch(function (error) {
      console.log("Error delete: ",error);
    });
    console.log("deleted");
    setOpen(false);
  }

  return (
    <Layout>
      <Container className="container" maxWidth="md">
        <Paper className={"paper"}>
          <Box display="flex"  spacing={2} >
            <Box flexGrow={1} ml={2} mt={2}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Studio Items
              </Typography>
            </Box>
            <Box mt={2} mr={2}>
              <Link to="/create" >
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={"table"} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studioItems?.length > 0 && studioItems.map((studioItem) => (
                  <TableRow key={studioItem.studioItemId}>
                    <TableCell align="right">{studioItem.studioItemId}</TableCell>
                    <TableCell align="left">{studioItem.name}</TableCell>
                    <TableCell align="left" className="description--truncate">{studioItem.description}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button>
                          <Link
                            className="btn btn-outline-success mx-1"
                            to={`/show/${studioItem.studioItemId}`}>
                            Show
                          </Link>
                        </Button>
                        <Button>
                          <Link
                          className="btn btn-outline-success mx-1"
                          to={`/edit/${studioItem.studioItemId}`}>
                          Edit
                        </Link>
                      </Button>

                        <Button onClick={()=>handleClickOpen(studioItem.studioItemId)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
                {studioItems?.length <= 0 &&
                  <TableRow key={0}>
                    <TableCell colSpan="7" align="center">No Studio Items</TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <DialogBox
          open={open}
          handleClose={handleClose}
          title='Are you sure?'
          desc="You won't be able to revert this!"
          textAgree='Yes, delete it!'
          handleAgree={()=>handleDelete(selectedStudioItem)}
          textDisagree='No'
          handleDisagree={handleClose}
        />
      </Container>
    </Layout>

  );
}
