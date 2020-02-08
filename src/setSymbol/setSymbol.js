import React,{useState ,useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {addStock} from "../contract/actions";
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
    }
  }),
);
function SetSymbol() {
    const classes = useStyles();
    const [search,setSearch] = useState("BA");
    const [searchList,setSearchList] = useState([]);
    useEffect(()=>{     
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=BE3G73M5LXMM6ZW8`)
        .then(res => res.json()).then((data)=>{
            console.log(data)
            if(data.bestMatches){
                setSearchList(data.bestMatches)
            } else {
                setSearchList([])
            }  
           
             
        }).catch(error => console.log(error))
    },[search])
    const addStockToBlockChain = async (stock) => {
        if(stock){
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock["1. symbol"]}&apikey=BE3G73M5LXMM6ZW8`)
        .then(res => res.json()).then((data)=>{
            console.log(data)
          if(data["Global Quote"]){
            addStock(data["Global Quote"]["01. symbol"],parseInt(data["Global Quote"]["05. price"]),parseInt(data["Global Quote"]["06. volume"]))
            } else {
                alert("Some problems occured")
            }
        }).catch(error => console.log(error))
    }
 
    }
    return (
        <div>
            <TextField 
            label="Symbol" 
            variant="outlined" 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className={classes.marginTop}
            />
            <List className={classes.root}>
      {searchList.length > 0 && searchList.map(value => {
        return (
          <ListItem key={value["1. symbol"]} role={undefined} dense >
            <ListItemText primary={`Name ${value["2. name"]}`} secondary={`Symbol ${value["1. symbol"]}`}/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" onClick={()=>addStockToBlockChain(value)}>
                <AddIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
        </div>
    )
}

export default SetSymbol
