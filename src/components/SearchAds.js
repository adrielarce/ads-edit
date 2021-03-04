import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    modal: {
        position: 'absolute',
        width: 400,
        maxHeight: 300,
        overflowY: 'scroll',
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        transform: 'translateX(50%) translateY(50%)',

    }
});

class SearchAdsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_aid: "",
            search_offer_name: "",
            search_offers_source: "",
            search_res: [],
            modal_open: false,
            modal_offer_name: "",
            modal_title: "",
            modal_message: "",
            modal_cta: "",
            modal_image: "",
            modal_url: "",
            modal_budget_ep: "",
            modal_budget_e: "",
            modal_budget_w: "",
            modal_budget_p: "",
            modal_camp_type: "",
            modal_start: "",
            modal_stop: "",
            modal_html: "",
        };
    }

    handleChange = event => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value
        });
        //console.log(this.state);
    };
    handleSearch = async event => {
        event.preventDefault();
        //setIsLoading(true);
        console.log(this.state.search_aid);
        const offer_name = this.state.search_offer_name;
        const offers_source = this.state.search_offers_source;
        const aid = this.state.search_aid;
        try {
            var ads = await this.searchForAds();
            console.log(ads);

            //filter through returned ads
            //var filteredAds = [];

            if (offer_name != "") {
                ads = ads.filter(function (ad) {
                    return ad.offer_name.includes(offer_name);
                });
            }
            if (aid != "") {
                ads = ads.filter(function (ad) {
                    return ad.aid.includes(aid);
                });
            }
            else if (offers_source != "") {
                ads = ads.filter(function (ad) {
                    return ad.offers_source.includes(offers_source);
                });
            }
            this.setState({
                search_res: ads,
            })
            console.log(ads);
        } catch (e) {
            console.log(e);
        }
    }
    searchForAds() {
        return API.get("ads", `/ads`);
    }

    handleListItemClick(ad) {
        //console.log(event.currentTarget.value);
        this.setState({
            modal_open: true,
            modal_offer_name: ad.offer_name,
            modal_title: ad.title,
            modal_message: ad.message,
            modal_cta: ad.cta,
            modal_image: ad.image_url,
            modal_url: ad.final_url,
            modal_budget_ep: ad.budget_ep,
            modal_budget_e: ad.budget_e,
            modal_budget_w: ad.budget_w,
            modal_budget_p: ad.budget_p,
            modal_camp_type: ad.campaign_type,
            modal_start: ad.start,
            modal_stop: ad.stop,
            modal_html: ad.html
        });
    }

    handleClose = async event => {
        this.setState({
            modal_open: false,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Search for Ads
                    </Typography>
                    <TextField
                        id="search_aid"
                        name="search_aid"
                        label="Ad ID"
                        value={this.state.search_aid}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="search_offer_name"
                        name="search_offer_name"
                        label="Offer Name"
                        value={this.state.search_offer_name}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="search_offers_source"
                        name="search_offers_source"
                        label="Offer Source"
                        value={this.state.search_offers_source}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="secondary" onClick={this.handleSearch}>
                        Search
                    </Button>
                    <Grid item xs={12} md={6}>
                        <div className={classes.demo}>
                            <List dense={true}>
                                {
                                    this.state.search_res.map((ad) => {
                                        return (
                                            <ListItem
                                                button
                                                onClick={() => this.handleListItemClick(ad)}
                                                value={ad}
                                            >
                                                <ListItemText
                                                    primary={ad.offer_name}
                                                    secondary={ad.aid}
                                                />
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                            <Modal
                                open={this.state.modal_open}
                                onClose={this.handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {<div className={classes.modal}>
                                    <p><b>Offer Name: </b> {this.state.modal_offer_name}</p>
                                    <p><b>Title: </b> {this.state.modal_title}</p>
                                    <p><b>Message: </b> {this.state.modal_message}</p>
                                    <p><b>Call to Action: </b> {this.state.modal_cta}</p>
                                    <p><b>Image: </b></p> <img src={this.state.modal_image} width="50" />
                                    <p><b>URL: </b> {this.state.modal_url}</p>
                                    <p><b>Budget (Email Primary): </b> {this.state.modal_budget_ep}</p>
                                    <p><b>Budget (Email): </b> {this.state.modal_budget_e}</p>
                                    <p><b>Budget (Web): </b> {this.state.modal_budget_w}</p>
                                    <p><b>Budget (Push): </b> {this.state.modal_budget_p}</p>
                                    <p><b>Type ID: </b> {this.state.modal_camp_type}</p>
                                    <p><b>Skip</b></p>
                                    <p><b>Start: </b> {this.state.modal_start} <b>Stop: </b>{this.state.modal_stop}</p>
                                    <p><b>HTML: </b></p> 
                                    <div dangerouslySetInnerHTML={{__html:this.state.modal_html}} />
                                </div>}
                            </Modal>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

}


export default withStyles(styles)(SearchAdsComponent);