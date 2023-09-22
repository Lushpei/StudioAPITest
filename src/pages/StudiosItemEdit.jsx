import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {serverURL, key} from '../config'
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import Box from "@mui/material/Box";
import {Link, useNavigate, useParams} from "react-router-dom";
import {DateTimePicker} from "@mui/x-date-pickers";

export const StudiosItemEdit = () => {
  const navigate = useNavigate();
  const [studioItemId, setStudioItemId] = useState(useParams().id)
  const [acquired, setAcquired] = useState(dayjs(new Date()))
  const [sold, setSold] = useState(dayjs(new Date()))
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [price, setPrice] = useState(0)
  const [soldFor, setSoldFor] = useState(0)
  const [eurorack, setEurorack] = useState(false)
  const [studioItemTypeId, setStudioItemTypeId] = useState(1)
  const [studioItemTypeIds, setStudioItemTypeIds] = useState([])
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
      fetch(`${serverURL}/api/${key}/StudioItems/${studioItemId}`, {
        method: 'GET',
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(
          ({data}) => {
            setStudioItemId(data.studioItemId);
            setAcquired(dayjs(data.acquired));
            setSold(dayjs(data.sold));
            setName(data.name);
            setDescription(data.description);
            setSerialNumber(data.serialNumber);
            setPrice(data.price);
            setSoldFor(data.soldFor);
            setEurorack(data.eurorack);
            setStudioItemTypeId(data.studioItemTypeId);
          }
        ).catch((error) => {
        console.log("error: ", error);
      })

    }, [studioItemId]
  )
  useEffect(() => {
    fetch(`${serverURL}/api/${key}/StudioItemTypes`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(
        (response) => {
          setStudioItemTypeIds(response.data)
        }
      ).catch((error) => {
      console.log("error: ", error);
    })
  }, [])

  const handleSave = event => {
    event.preventDefault();
    const data = {
      "studioItemId": studioItemId,
      "acquired": acquired.format('YYYY-MM-DDTHH:MM'),
      "sold": sold.format('YYYY-MM-DDTHH:MM'),
      "name": name,
      "description": description,
      "serialNumber": serialNumber,
      "price": price,
      "soldFor": soldFor,
      "eurorack": eurorack,
      "studioItemTypeId": studioItemTypeId
    };
    setIsSaving(true);

    fetch(`${serverURL}/api/${key}/StudioItems`, {
      method: 'POST',
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsSuccess(true);
          setIsSaving(false);
          setTimeout(() => navigate("/"), 1500);
        }
      ).catch((error) => {
      setIsError(true);
      setTimeout(() => setIsError(false), 1500);
    })
  }

  useEffect(() => {
    fetch(`${serverURL}/api/${key}/StudioItemTypes`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(
        (response) => {
          setStudioItemTypeIds(response.data)
        }
      ).catch((error) => {
      console.log("error: ", error);
    })
  }, [])
  return (
    <Container maxWidth="xs">
      <div>
        <Box>
          {isError && <Alert severity="warning">An Error Occured!</Alert>}
          {isSuccess && <Alert severity="success">Updated successfully!</Alert>}
        </Box>
        <Box display="flex" mb={3} mt={3}>
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Edit studio item
            </Typography>
          </Box>
          <Box>
            <Link to="/">
              <Button variant="contained" color="primary">
                Home
              </Button>
            </Link>
          </Box>
        </Box>
        <form onSubmit={handleSave}>
          <Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <LocalizationProvider style={{width: "100%"}} dateAdapter={AdapterDayjs}>

                <DateTimePicker value={acquired}
                                name="acquired"
                                variant="outlined"
                                id="acquired"
                                label="acquired"
                                onChange={(newValue) => setAcquired(newValue)}
                                slotProps={{textField: {fullWidth: true}}}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker value={sold}
                                name="sold"
                                variant="outlined"
                                id="sold"
                                label="Sold"
                                onChange={(newValue) => setSold(newValue)}
                                slotProps={{textField: {fullWidth: true}}}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <TextField value={name}
                         name="name"
                         variant="outlined"
                         required
                         style={{width: "100%"}}
                         id="name"
                         label="Name"
                         onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <TextField
                value={description}
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                style={{width: "100%"}}
                id="description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <TextField
                value={serialNumber}
                autoComplete="serialNumber"
                name="serialNumber"
                variant="outlined"
                required
                style={{width: "100%"}}
                id="serialNumber"
                label="Serial number"
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <TextField
                value={price}
                type="number"
                autoComplete="price"
                name="price"
                variant="outlined"
                style={{width: "100%"}}
                id="price"
                label="Price"
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <TextField
                value={soldFor}
                type="number"
                autoComplete="soldFor"
                name="soldFor"
                variant="outlined"
                style={{width: "100%"}}
                id="soldFor"
                label="Sold for"
                onChange={(e) => setSoldFor(+e.target.value)}
              />
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <FormControlLabel control={<Checkbox
                checked={eurorack}
                autoComplete="eurorack"
                name="eurorack"
                variant="outlined"
                style={{width: "100%"}}
                id="eurorack"
                onChange={(e) => setEurorack(e.target.checked)}
              />} label="Eurorack"/>
            </Grid>
            <Grid item mt={2} mb={2} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-id-select-label">Studio item type id</InputLabel>
                <Select
                  value={studioItemTypeId||""}
                  labelId="type-id-select-label"
                  id="type-id-select-label"
                  label="Studio item type id"
                  onChange={(e) => setStudioItemTypeId(+e.target.value)}
                >
                  {studioItemTypeIds.map(({studioItemTypeId, value}) => (
                    <MenuItem key={studioItemTypeId} value={studioItemTypeId}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item mt={1}>
              <Button type="submit"
                      style={{width: "100%"}}
                      variant="contained"
                      color="primary"
                      disabled={isSaving}
              >
                Update
              </Button>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
  );
}
