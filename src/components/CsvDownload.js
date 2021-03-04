import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";
import { CSVLink } from "react-csv";

/*
const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
<CSVLink data={csvData}>Download me</CSVLink>;
// or
<CSVDownload data={csvData} target="_blank" />;
*/


const styles = theme => ({
    formControl: {
        width: '80%'
    },
    csvColumns: {
        maxHeight: 250,
        overflowY: 'scroll',
    }
});

class CsvDownloadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCsvColumns: "none",
            csv_search_field: "",
            csv_search_type: "",
            csv_search_field_value: "",
            csv_all_columns: true,
            csv_columns: [],
            csv_data: [],
        };
    }
    handleChange = event => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value
        });
        //console.log(this.state);
    };
    onCheck = event => {
        // current array of options
        const csv_columns = this.state.csv_columns;
        let index;
        //console.log(event.target.value);
        // check if the check box is checked or unchecked
        if (event.target.checked) {
            // add the numerical value of the checkbox to options array
            csv_columns.push(event.target.value);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = csv_columns.indexOf(event.target.value);
            csv_columns.splice(index, 1);
        }

        // update the state with the new array of options
        this.setState({ csv_columns: csv_columns });
        console.log(this.state.csv_columns);
    }
    handleDownload = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            const ads = await this.searchForDownload(this.state.csv_search_field, this.state.csv_search_type, this.state.csv_search_field_value);
            console.log(ads);
            if (ads.length > 0) {
                console.log(ads.length + " ads returned");
                if (this.state.csv_all_columns) {
                    this.setState({
                        csv_data: ads
                    })
                }
                else {
                    //finding which columns to add to csv file
                    console.log(this.state.csv_columns);
                    const adsKeys = Object.keys(ads[0]);

                    var temp = new Set(this.state.csv_columns);
                    var difference = [...new Set(adsKeys.filter(x => !temp.has(x)))]; //array of ads properties that will be not displayed in csv file
                    console.log(difference);

                    for (var i = 0, len = ads.length; i < len; i++) {
                        difference.forEach(property => {
                            delete ads[i][property];
                        });
                    }

                    console.log(ads);
                    //format csv data
                    var csv_rows = Array();
                    csv_rows.push(Object.keys(ads[0]));

                    ads.forEach(ad => {
                        csv_rows.push(Object.values(ad));
                    });

                    console.log(csv_rows);
                    this.setState({
                        csv_data: csv_rows
                    });
                }
            }
            else
                console.log("no ads returned");
        } catch (e) {
            console.log(e);
        }
    }
    searchForDownload(attr, type, val) {
        return API.get("ads", `/download/${attr}/${type}/${val}`);
    }
    handleSearch = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            const ad = await this.searchAID(this.state.load_aid);
            console.log(ad);
            const { aid, offer_name } = ad[0];
            this.setState({
                load_aid: "",
                aid: aid,
                offer_name: offer_name,
                csv_values: "",
            });
        } catch (e) {
            console.log(e);
        }
    }
    searchAID(aid) {
        return API.get("ads", `/ads/${aid}`);
    }
    handleCsvColumns = event => {
        if (event.target.value == "custom") {
            this.setState({
                csv_all_columns: false,
                displayCsvColumns: ''
            });
        }
        else {
            this.setState({
                displayCsvColumns: 'none'
            });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Download CSV
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="csv_search_field_label">Field</InputLabel>
                        <Select
                            native
                            labelId="csv_search_field_label"
                            value={this.state.csv_search_field}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'csv_search_field',
                                id: 'csv_search_field',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value="offers_source">Offer Source</option>
                            <option value="offer_name">Offer Name</option>
                            <option value="landing_type">Landing Type</option>
                            <option value="gid">Group ID</option>
                            <option value="oid">Offer ID</option>
                            <option value="cid">Creative ID</option>
                            <option value="aid">Ad ID</option>
                            <option value="lid">Link ID</option>
                            <option value="status">Status</option>
                            <option value="use_html">Use HTML</option>
                            <option value="campaign_type">Campaign Type</option>
                            <option value="payout">Payout</option>
                            <option value="payout_type">Payout Type</option>
                            <option value="click_amount">Click Amount</option>
                            <option value="view_amount">View Amount</option>
                            <option value="epc_override">EPC Override</option>
                            <option value="budget_ep">Budget (EP)</option>
                            <option value="budget_e">Budget (E)</option>
                            <option value="budget_w">Budget (W)</option>
                            <option value="budget_p">Budget (P)</option>
                            <option value="budget_type">Budget Type</option>
                            <option value="budget_link">Budget Link</option>
                            <option value="test_clicks_ep">Test Clicks (EP)</option>
                            <option value="test_clicks_e">Test Clicks (E)</option>
                            <option value="test_clicks_w">Test Clicks (W)</option>
                            <option value="test_clicks_p">Test Clicks (P)</option>
                            <option value="campaign_network">Campaign Network</option>
                            <option value="brand_include">Brand Include</option>
                            <option value="country_include">Country Include</option>
                            <option value="pid_include">Platform Include</option>
                            <option value="start">Start</option>
                            <option value="stop">Stop</option>
                            <option value="aid_include">Ad ID Include</option>
                            <option value="aid_exclude">Ad ID Exclude</option>
                            <option value="invoiced">Invoiced</option>
                            <option value="paid">Paid</option>
                            <option value="amount">Amount</option>
                            <option value="tested">Tested</option>
                            <option value="notes">Notes</option>
                            <option value="subject">Subject</option>
                            <option value="title">Title</option>
                            <option value="message">Message</option>
                            <option value="cta">CTA</option>
                            <option value="image">Image</option>
                            <option value="categories">Categories</option>
                            <option value="subcategories">Subcategories</option>
                            <option value="keywords">Keywords</option>
                            <option value="agency">Agency</option>
                            <option value="publisher">Publisher</option>
                            <option value="editor_id">Editor ID</option>
                            <option value="bid_t">Target Brand</option>
                            <option value="final_url">URL</option>
                        </Select>
                    </FormControl>

                    <Select
                        native
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'csv_search_type',
                            id: 'csv_search_type',
                        }}
                    >
                        <option value="contains">contains</option>
                        <option value="equals">equals</option>
                    </Select>
                    <TextField
                        id="csv_search_field_value"
                        name="csv_search_field_value"
                        label="Value"
                        value={this.state.csv_search_field_value}
                        onChange={this.handleChange}
                    />
                    <FormLabel component="legend">CSV Columns</FormLabel>
                    <RadioGroup aria-label="csv_columns" name="csv_columns" onChange={this.handleCsvColumns}>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                    </RadioGroup>
                </Grid>
                <Grid style={{ display: this.state.displayCsvColumns }} className={classes.csvColumns} item sm={6}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">ID</FormLabel>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="added" />}
                                label="Date/Time Added"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="offer_source" />}
                                label="Offer Source"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="offer_name" />}
                                label="Offer Name"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="offer_number" />}
                                label="Offer Number"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="oid" />}
                                label="Offer ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="aid" />}
                                label="Ad ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="cid" />}
                                label="Creative ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="gid" />}
                                label="Group ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="lid" />}
                                label="Link ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="landing_type" />}
                                label="Landing Type"
                            />
                        </FormGroup>
                        <FormLabel component="legend">Settings</FormLabel>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="status" />}
                                label="Status"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="use_html" />}
                                label="Use HTML"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="campaign_type" />}
                                label="Campaign Type"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="payout" />}
                                label="Payout"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="payout_type" />}
                                label="Payout Type"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="click_amount" />}
                                label="Click Amount"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="view_amount" />}
                                label="View Amount"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="epc_override" />}
                                label="EPC Override"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_ep" />}
                                label="Budget (EP)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_e" />}
                                label="Budget (E)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_W" />}
                                label="Budget (W)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_p" />}
                                label="Budget (P)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_p" />}
                                label="Budget (E)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_type" />}
                                label="Budget Type"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="budget_link" />}
                                label="Budget Link"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_ep" />}
                                label="Test Clicks (EP)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_e" />}
                                label="Test Clicks (E)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_w" />}
                                label="Test Clicks (W)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_p" />}
                                label="Test Clicks (P)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="campaign_network" />}
                                label="Campaign Network"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="brand_include" />}
                                label="Brand Include"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="country_include" />}
                                label="Country Include"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="pid_include" />}
                                label="Platform Include"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="start" />}
                                label="Start"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="stop" />}
                                label="Stop"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="aid_include" />}
                                label="Ad ID Include"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="aid_exclude" />}
                                label="Ad ID Exclude"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_ep" />}
                                label="Test Clicks (EP)"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="test_clicks_ep" />}
                                label="Test Clicks (EP)"
                            />
                        </FormGroup>
                        <FormLabel component="legend">Admin</FormLabel>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="invoiced" />}
                                label="Invoiced"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="paid" />}
                                label="Paid"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="tested" />}
                                label="Tested"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="amount" />}
                                label="Amount"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="notes" />}
                                label="Notes"
                            />
                        </FormGroup>
                        <FormLabel component="legend">Creative</FormLabel>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="subject" />}
                                label="Subject"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="title" />}
                                label="Title"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="message" />}
                                label="Message"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="cta" />}
                                label="CTA"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="image" />}
                                label="Image"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="html" />}
                                label="HTML"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="categories" />}
                                label="Categories"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="subcategories" />}
                                label="Subcategories"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="keywords" />}
                                label="Keywords"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="agency" />}
                                label="Agency"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="publisher" />}
                                label="Publisher"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="editor_id" />}
                                label="Editor ID"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="bid_t" />}
                                label="Target Brand"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="final_url" />}
                                label="Final URL"
                            />
                        </FormGroup>
                        <FormLabel component="legend">Tokens</FormLabel>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s1" />}
                                label="s1"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s2" />}
                                label="s2"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s3" />}
                                label="s3"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s4" />}
                                label="s4"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s5" />}
                                label="s5"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s6" />}
                                label="s6"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s7" />}
                                label="s7"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s8" />}
                                label="s8"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s9" />}
                                label="s9"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s10" />}
                                label="s10"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s11" />}
                                label="s11"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s12" />}
                                label="s12"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s13" />}
                                label="s13"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s14" />}
                                label="s14"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={this.onCheck} value="s15" />}
                                label="s15"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={12}>
                    <Button variant="contained" color="secondary" onClick={this.handleDownload}>
                        Generate CSV
                    </Button>

                    {this.state.csv_data.length != 0 ? <CSVLink data={this.state.csv_data} filename="ads.csv">Download me</CSVLink> : null}
                </Grid>
            </React.Fragment>
        );
    }

}


export default withStyles(styles)(CsvDownloadComponent);