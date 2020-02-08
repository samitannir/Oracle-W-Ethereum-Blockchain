import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getPriceStock,getVolumeStock} from "../contract/actions";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto"
    },
    marginTop: {
        margin: "20px"
    },
    block: {
        display: "block"
    }
  }),
);
function GetSymbol() {
    const classes = useStyles();
    const [symbol,setSymbol] = React.useState("");
    const [result,setResult] = React.useState("");
    const getPrice = async ()=> {
        const Newresult = await getPriceStock(symbol);
        console.log(Newresult)
        setResult(Newresult)
    }
    const getVolumne = async ()=> {
        const Newresult = await getVolumeStock(symbol);
        setResult(Newresult)
    }
    return (
        <div>
            <TextField 
            label="Symbol" 
            variant="outlined" 
            value={symbol}
            onChange={(e)=> setSymbol(e.target.value)}
            className={classes.marginTop}
            />
            <hr />
             <Button variant="contained" color="primary" onClick={getPrice}>
                Get Price
            </Button>
            <hr />
            <Button variant="contained" color="primary" onClick={getVolumne}>
                Get Volume
            </Button>
             <p> Result : {result}</p>
        </div>
    )
}

export default GetSymbol
