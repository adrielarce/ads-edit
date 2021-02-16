import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";




const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        margin: '1.5rem auto',
        width: '80%',
        padding: '1rem',
    },
});

class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_aid: "",
            aid: "",
            offer_name: ""
        };
    }
    handleChange = event => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value
        });
    };
    handleSubmit = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            await this.createAID({
                aid: this.state.aid,
                offer_name: this.state.offer_name
            });
            //clear form values after submit complete
            this.setState({
                aid: "",
                offer_name: ""
            });
        } catch (e) {
            console.log(e);
        }
    }
    createAID = content => {
        return API.post("ads", "/ads", {
            body: content
        });
    }
    handleSearch = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            const ad = await this.searchAID(this.state.search_aid);
            console.log(ad);
            const { aid,offer_name } = ad[0];
            this.setState({
                search_aid: "",
                aid: aid,
                offer_name: offer_name
            });
        } catch (e) {
            console.log(e);
        }
    }
    searchAID(aid){
        return API.get("ads", `/ads/${aid}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    id="search_aid"
                                    name="search_aid"
                                    label="Ad ID"
                                    value={this.state.search_aid}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" color="secondary" onClick={this.handleSearch}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    required
                                    id="aid"
                                    name="aid"
                                    label="Ad ID"
                                    placeholder="AID"
                                    value={this.state.aid}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="offer_name"
                                    name="offer_name"
                                    label="Ad Offer Name"
                                    value={this.state.offer_name}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }

}


export default withStyles(styles)(MainForm);