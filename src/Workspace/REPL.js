import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function REPL() {
  const classes = useStyles();

  const [currentCode, setCurrentCode] = React.useState('');
  const [records, setRecords] = React.useState([]);

  const handleEval = () => {
    if (currentCode !== '') {
      records.push({
	code: currentCode,
	result: "result of " + currentCode //TODO: result: this.props.eval(env:inputs, code:currentCode);
      })
      setRecords(records);
      console.log(records);
      setCurrentCode('');
    }
  }
  const handleClear = () => {
    setRecords([]);
  }
  const handleChangeCurrentCode = event => {
    setCurrentCode(event.target.value);
  };

  return (
    <div className="REPL">
      <div className={classes.root}>
	<ButtonGroup color="primary" aria-label="outlined primary button group">
	  <Button onClick={handleEval}>Eval</Button>
	  <Button onClick={handleClear}>Clear</Button>
	</ButtonGroup>
	{records.map(rec => (
	  <div className="single-record">
	    <TextField
	      className="past-input"
	      disabled
	      value={rec.code}
	      multiline
	      variant="outlined"
	    />
	    <Typography className="past-result">{rec.result}</Typography>
	  </div>
	))}
	<div className="REPL-code">
	  <form className={classes.root} noValidate autoComplete="off">
	    <TextField
	      id="REPL-input"
	      variant="outlined"
	      multiline
	      onChange={handleChangeCurrentCode}
	      value={currentCode}
	    />
	  </form>
	</div>
      </div>
    </div>
  );
}

export default REPL;
